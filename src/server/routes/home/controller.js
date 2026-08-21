import { buildMicrositePath } from '@defra/lis-infra-ui-services'
import { taxonomy } from '@defra/lis-taxonomy-move'
import { species } from '@defra/lis-species-cattle'

export const homeController = {
  handler(request, h) {
    const displayName =
      [request.app.hubAuth?.firstName, request.app.hubAuth?.lastName]
        .filter(Boolean)
        .join(' ') || null
    const signedInAs =
      request.app.hubAuth?.email ??
      displayName ??
      request.app.hubAuth?.sub ??
      'Authenticated user'

    return h.view('home/index', {
      pageTitle: 'Move for Cattle',
      heading: 'Move for Cattle',
      caption: 'Spoke microsite',
      taxonomy,
      species,
      signedInAs,
      directPort: 3202,
      hubPath: buildMicrositePath(taxonomy.id, species.id),
      apiEndpoint: 'http://localhost:3227/api/species/cattle/taxonomies/move'
    })
  }
}
