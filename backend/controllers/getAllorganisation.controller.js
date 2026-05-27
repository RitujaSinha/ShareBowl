import Organisation from "../models/organisationmodels/Organisation.models.js";

//get all organisations for donor to select
export const getAllOrganisations = async (req,res) => {
    try {
        const organisations = await Organisation.find({
            isAdminVerified:true,
            isEmailVerified:true
        },
         "organisationName city state"
        );
        res.status(200).json(organisations)
    } catch (error) {
        console.log(error);

        res.status(500).json({
        message: "Failed to fetch organisations",
        });
    }
    
}