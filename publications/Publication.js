const { use } = require("express/lib/application")

module.exports = (PublicationModel, PersonajeModel, CommentModel, RegionModel, PrefectureModel, UserModel, UserPublicationModel, CharactersModel) => {

  class Publication {

    async getCharacters() {
      try{
        const character = await CharactersModel.findAll()
        return character
      }catch(e){
          throw e
      }
    }

    async getPublications() {
      try {
        const publications = await PublicationModel.findAll({
        // attributes: {
        //   exclude: ['password']
        // }
        })
        return publications
      } catch(e) {
        throw e
      }
    }

    async getChar(id) {
      try {
        const char = await PersonajeModel.findByPk(id)
        if (char) {
          return char
        } else {
          throw new Error('Personaje no encontrado')
        }
      } catch(e) {
        throw e
      }
    } 

    async getPrefectures(regionId) {
      try {
        const prefectures = await PrefectureModel.findAll({
          where: {
            regionId: regionId,
          }
        })
        return prefectures
      } catch(e) {
        throw e
      }
    }

    async getRegion(regionId) {
      try {
        const region = await RegionModel.findByPk(regionId)
        return region
      } catch(e) {
        throw e
      }
    }

    async getRegions() {
      try {
        const regions = await RegionModel.findAll()
        return regions
      } catch(e) {
        throw e
      }
    }

    async getPublicationsBySite(regionId, prefectureId) {
      try {
        if (!regionId || !prefectureId) {
          throw new Error('Los IDs de la región y de la prefectura son obligatorios')
        }
        const publications = await PublicationModel.findAll({
          where: {
            regionId: regionId,
            prefectureId: prefectureId
          }
        })
        return publications
      } catch (e) {
        throw e
      }
    }

    async getComments(publicationId) {
      try {
        if (!publicationId) {
          throw new Error('El ID de la publicación es obligatorio')
        }
        const comments = await CommentModel.findAll({
          where: {
            publicationId: publicationId,
          },
          include: {
            model: UserModel,
            nested: true,
            attributes: {
              exclude: ['password']
            }
          }
        })
        return comments
      } catch (e) {
        throw e
      }
    }


    async create(publication, user) {
      if (!publication || !publication.title || !publication.body) {
        throw new Error('Campos incorrectos')
      }
      if (!publication.regionId || !publication.prefectureId) {
        throw new Error('El ID de la región y de la prefectura son obligatorios')
      }
      await PublicationModel.create({
        title: publication.title,
        body: publication.body || null,
        summary: publication.summary,
        createdAt: new Date(),
        updatedAt: null,
        regionId: publication.regionId,
        prefectureId: publication.prefectureId,
        userId: user.id
      })
      return true
    }

    async createComment(comment, user) {
      if (!comment || !comment.title || !comment.body) {
        throw new Error('Campos incorrectos')
      }
      if (!comment.publicationId) {
        throw new Error('El ID de la publicación es obligatorio')
      }
      await CommentModel.create({
        title: comment.title,
        body: comment.body || null,
        userId: user.id,
        publicationId: comment.publicationId,
        createdAt: new Date(),
        updatedAt: null,
      })
      return true
    }

    async saveFavourite(publication, user) {
      if (!publication || !publication.regionId || !publication.prefectureId) {
        throw new Error('Campos incorrectos')
      }
      if (!publication.id) {
        throw new Error('El ID de la publicación es obligatorio')
      }
      const currentFavourite = await UserPublicationModel.findOne({
        where: {
          userId: user.id,
          publicationId: publication.id
        }
      })
      if (currentFavourite) return false
      const region = await RegionModel.findByPk(publication.regionId)
      if (region) publication.region = region.name
      const prefecture = await PrefectureModel.findByPk(publication.prefectureId)
      if (prefecture) publication.prefecture = prefecture.name
      await UserPublicationModel.create({
        publicationId: publication.id,
        region: publication.region,
        prefecture: publication.prefecture,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: null,
      })
      return true
    }

    async delete(id) {
      try {
        const publication = await PublicationModel.findByPk(id)
        if (!publication) {
          throw new Error('Publicación no encontrada')
        }
        await CommentModel.destroy({
          where: {
            publicationId: id
          }
        })
        await publication.destroy()
        return true
      } catch (e) {
        throw e
      }
    }

  }

  return new Publication()

}