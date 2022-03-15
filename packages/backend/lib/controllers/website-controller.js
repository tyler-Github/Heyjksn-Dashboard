import Joi from "joi";
import * as AuroraDB from "../database";
import { ValidationError } from "../error";

export const WebsiteController = {
  index: async ({ req, res }) => {
    const websites = await AuroraDB.getUserWebsites(req.user.id);
    return res.status(200).json(websites);
  },

  show: async ({ req, res }) => {
    const website = await AuroraDB.getWebsite(req.query.id);
    return res.status(200).json(website);
  },

  store: async ({ req, res }) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      url: Joi.string().required(),
      is_public: Joi.boolean().required(),
    });

    const { error, value: validated } = rules.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      throw new ValidationError(422, error.message);
    }

    const createdWebsite = await AuroraDB.createWebsite({
      user_id: req.user.id,
      ...validated,
    });

    return res.status(201).json(createdWebsite);
  },

  update: async ({ req, res }) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      url: Joi.string().required(),
      is_public: Joi.boolean().required(),
    });

    // TODO: Find a way to apply validation in a concise way
    const { error, value: validated } = rules.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      throw new ValidationError(422, error.message);
    }

    const updatedWebsite = await AuroraDB.updateWebsite(
      req.params.id,
      validated
    );

    return res.status(201).json({ data: updatedWebsite });
  },

  destroy: async ({ req, res }) => {
    const deletedWebsite = await AuroraDB.deleteWebsite(req.params.id);
    return res.status(200).json({ data: deletedWebsite });
  },
};
