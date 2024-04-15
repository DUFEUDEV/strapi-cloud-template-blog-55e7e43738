const admin = require('firebase-admin');

module.exports = {
    async afterUpdate(event) {
        const { result } = event;

        if(result.publishedAt != null) {

            const updatedEntity = await strapi.entityService.findOne("api::offre-promotionnelle.offre-promotionnelle", result.id, {
                populate: { cible: true },
              });

            const message = {
                notification: {
                    title: result.Titre,
                    body: result.Notification,
                },
                topic: updatedEntity.cible.Valeur,
                data: { articleId: String(result.id) },
            };

            admin.messaging().send(message)
                .then((response) => {
                    console.log('Notification envoyée avec succès:', response);
                })
                .catch((error) => {
                    console.log("Erreur lors de l'envoi de la notification:", error);
                });
        }
    },
}
