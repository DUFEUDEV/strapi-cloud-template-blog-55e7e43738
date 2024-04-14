'use strict';

/**
 * article service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article');

module.exports = {
    async afterCreate(article) {
      const { result } = article;
  
      strapi.services.notification.sendToTopic({
        topic: 'nouvelles',
        title: 'Nouvel Article Publié',
        body: result.title,
        data: { articleId: result.id },
      });
    }
  };
  
