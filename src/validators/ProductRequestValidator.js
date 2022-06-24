import * as yup from "yup";
import { AppException } from "../exceptions/AppException.js";

yup.setLocale({
  mixed: {
    default: "É inválido",
    required: "É um campo obrigatório",
  },
  string: {
    length: "deve ter exatamente ${length} caracteres",
    min: "deve ter pelo menos ${min} caracteres",
    max: "deve ter no máximo ${max} caracteres",
    email: "tem o formato de e-mail inválido",
    url: "deve ter um formato de URL válida",
  },
});

export const validateRequest = (schema) => {
  return async (request, response, next) => {
    try {
      const body = JSON.parse(request.body.product);

      const validatedBody = await schema.validate(body, {
        abortEarly: false,
      });

      request.body.product = JSON.stringify(validatedBody);

      next();
    } catch (err) {
      console.log(err)
      const errors = err.inner;
      console.log(errors)
      let message = ``;

      errors.forEach((err) => {
        message += `Campo: ${err.path} ${err.errors.join(", ")} `;
      });

      throw new AppException(message);
    }
  };
};