module.exports = {
    sendToTopic: function({ topic, title, body, data }) {
      const message = {
        notification: {
          title: title,
          body: body,
        },
        topic: topic,
        data: data,
      };
  
      strapi.plugins['FCM'].services.fcm.send(message)
      .then(response => {
        console.log('Successfully sent message:', response);
      })
      .catch(error => {
        console.error('Failed to send message:', error);
      });
      
    }
  };