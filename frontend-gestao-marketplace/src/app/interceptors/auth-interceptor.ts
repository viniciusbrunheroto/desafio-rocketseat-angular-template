import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { UserAuthService } from "../services/user-auth";
import { inject } from "@angular/core";


/**
  1ª Etapa: Injeção do serviço de autenticação
  2ª Etapa: Recuperar o token de authenticação do usuário do localStorage
  3ª Etapa: Verificar se o token existe, se existir, clonar a requisição e adicionar o header de Authorization
  4ª Etapa: Passar a requisição clonada para frente
  5ª Etapa: Caso não exista o token, passar a requisição original para frente
 */

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

    const _userAuthService = inject(UserAuthService);

    const HAS_TOKEN = _userAuthService.getUserToken();

    if (HAS_TOKEN) {
        const newReq = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`)
        });

        return next(newReq);
    }

    return next(req);
}