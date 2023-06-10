

export const allResponses: Record<string, any> = {
    found: {
        status: 200,
        message: 'Cet donné a été trouvée !',
    },
    already_exists: {
        status: 409,
        message: 'Certaines informations que vous avez envoyé existent déjà',
    },
    created: {
        status: 201,
        message: 'Creation effectuée avec succès !',
    },
     not_found:  {
        status: 404,
        message: 'Aucun résultat !',
    },
    unauthorized:  {
        status: 401,
        message: 'Non authentifié',
    },
    forbiden: {
        status: 403,
        message: 'Vous n\'êtes pas autorisé effectuer cette opération.',
    },
    bad_request: {
        status: 400,
        message: 'Certaines des informations fournies sont incorrectes.',
    },
    internal_server_error: {
        status: 500,
        message: 'Nous sommes désolé pour cette erreur.'
    }
};