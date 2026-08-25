"use server";

import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { sql, desc, gte } from "drizzle-orm";

export async function getAnalyticsData() {
  try {
    // 1. Total views
    const totalViewsResult = await db.select({ count: sql<number>`count(*)` }).from(pageViews);
    const totalViews = Number(totalViewsResult[0]?.count) || 0;

    // 2. Unique visitors
    const uniqueVisitorsResult = await db.select({ count: sql<number>`count(distinct visitor_id)` }).from(pageViews);
    const uniqueVisitors = Number(uniqueVisitorsResult[0]?.count) || 0;

    // 3. Today's views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayViewsResult = await db.select({ count: sql<number>`count(*)` })
      .from(pageViews)
      .where(gte(pageViews.createdAt, today));
    const todayViews = Number(todayViewsResult[0]?.count) || 0;

    // 4. Last 30 days chart data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const viewsByDate = await db.select({
      date: sql<string>`date_trunc('day', ${pageViews.createdAt})::date`,
      count: sql<number>`count(*)`
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(sql`date_trunc('day', ${pageViews.createdAt})::date`)
    .orderBy(sql`date_trunc('day', ${pageViews.createdAt})::date`);

    // Format data to fill in missing days with 0
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0]; // YYYY-MM-DD
      
      const found = viewsByDate.find(v => v.date === dateString);
      chartData.push({
        date: d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        views: found ? Number(found.count) : 0
      });
    }

    // 5. Top Pages
    const topPages = await db.select({
      path: pageViews.path,
      views: sql<number>`count(*)`
    })
    .from(pageViews)
    .groupBy(pageViews.path)
    .orderBy(desc(sql`count(*)`))
    .limit(5);

    // 6. Top Referrers
    const topReferrers = await db.select({
      referer: pageViews.referer,
      views: sql<number>`count(*)`
    })
    .from(pageViews)
    .where(sql`${pageViews.referer} IS NOT NULL`)
    .groupBy(pageViews.referer)
    .orderBy(desc(sql`count(*)`))
    .limit(5);

    // 7. Top Countries
    const topCountries = await db.select({
      country: pageViews.country,
      views: sql<number>`count(*)`
    })
    .from(pageViews)
    .where(sql`${pageViews.country} IS NOT NULL`)
    .groupBy(pageViews.country)
    .orderBy(desc(sql`count(*)`))
    .limit(5);

    return {
      stats: {
        total: totalViews,
        today: todayViews,
        unique: uniqueVisitors
      },
      chartData,
      topPages,
      topReferrers,
      topCountries
    };

  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return {
      stats: { total: 0, today: 0, unique: 0 },
      chartData: [],
      topPages: [],
      topReferrers: [],
      topCountries: []
    };
  }
}
