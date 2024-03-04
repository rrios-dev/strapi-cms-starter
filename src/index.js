"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "UsersPermissionsMe",
          definition(t) {
            t.field("avatar", {
              type: "UploadFile", // Cambia el tipo según el nombre de tu entidad de archivos de medios
              resolve: async (_, __, context) => {
                const relatedFile = await strapi.db
                  .query("files_related_morphs")
                  .findOne({
                    related_id: context.state.user.id,
                    field: "avatar",
                  });

                const file = await strapi.db
                  .query("plugin::upload.file")
                  .findOne({ id: relatedFile.file_id });

                return file;
              },
            });
          },
        }),
      ],
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
