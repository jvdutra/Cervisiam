export default {
    getMessageByCode(code: string) {
        switch (code) {
            case 'INCORRECT_LOGIN':
                return 'Usuário e/ou senha incorretos.';
            case 'SERVER_ERROR':
                return 'Um erro desconhecido aconteceu ao efetuar seu login. Por favor, tente novamente.';
            case 'USER_EXISTS':
                return 'O e-mail informado já está registrado.';
            default:
                return '';
        }
    }
}