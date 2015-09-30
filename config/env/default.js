'use strict';

module.exports = {
  app: {
    title: 'Mapping Salt Lake City',
    description: 'Mapping Salt Lake City is a community-created archive of Salt Lake City’s neighborhoods and people that documents the city’s changes through art, critical and creative literature, personal maps and multimedia projects. We invite people to engage with and evolve this site by submitting their own contributions.',
    keywords: 'mapping, map, geojson, salt lake city, utah, art, humanities, digital humanities, nonfiction, essays, storytelling, salt lake county, paisley rekdal, chris tanseer',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  // Session Cookie settings
  sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser 
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: 'MEAN',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/favicon.ico'
};
