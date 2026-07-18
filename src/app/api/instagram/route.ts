import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      // Return a standard error so the frontend knows to display the local academy fallback posts
      return NextResponse.json(
        { success: false, error: 'Instagram Access Token is not configured in environment.' },
        { status: 200 } // Return 200 so the fetch doesn't crash the client console
      );
    }

    // Call the Instagram Basic Display Graph API to retrieve media fields
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}&limit=6`,
      { next: { revalidate: 300 } } // Cache feed for 5 minutes (300 seconds) to prevent API rate limits
    );

    if (!response.ok) {
      const errData = await response.json();
      console.warn('Instagram API error response:', errData);
      return NextResponse.json({ success: false, error: errData.error?.message || 'Graph API request failed' });
    }

    const resData = await response.json();
    return NextResponse.json({ success: true, data: resData.data || [] });
  } catch (error: any) {
    console.error('Failed to retrieve Instagram media feed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error occurred' });
  }
}
