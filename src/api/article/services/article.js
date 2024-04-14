'use strict';

/**
 * article service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article');

module.exports = {
    async afterCreate(article) {
      const { result } = article;
      const message = {
        notification: {
          title: article.title,
          body: article.title,
        },
        topic: 'nouvelles',
        data: { articleId: result.id },
      };
  
      strapi.plugins['FCM'].services.fcm.send(message)
      .then(response => {
        console.log('Successfully sent message:', response);
      })
      .catch(error => {
        console.error('Failed to send message:', error);
      });
      strapi.services.notification
    }
  };
  
