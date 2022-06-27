# new Date: 19:32 - 26/04/2022

Amanhã eu posso começar a desenvolver a lógica de ler um artigo

Ou posso refatorar os arquivos de criação e autenticação de usuário

# new Date: 22:12 - 27/04/2022

Refatorei os arquivos de criação de usuário, mas ainda não testei se realmente está funcionando

# new Date: 21:56 - 29/04/2022

Refatorei a url do artigo para deixar mais seguro

Agora o usario é criado com uuid, mas somente no postgres,
vou mudar para que isso seja responsabilidade da aplicação,para que se eu mudar de banco de dados isso não me atrapalhar

# new Date: 22:19 - 26/06/2022

Parei com esse negócio de new Date a tempo, chato demais

# All features

- [x] O user é autenticada usando jwt
- [ ] O id do user não é um numero inteiro, mas sim um UUID gerado no postgres
- [x] O id do user não é um numero inteiro, mas sim um UUID gerado na aplicação

- [x] autenticar um usuário

- [x] criar artigo
- [x] ler um unico artigo
- [x] ler varios artigos
- [x] atualizar artigo
- [x] Deletar artigo

- [x] o artigo mostra o usuário que o criou

- [ ] as categorias são unicas no banco de dados

- [x] criar um usuário
- [ ] ler um usuário pelo id ou user_name
- [ ] atualizar usuário
- [ ] Deletar usuário

- [ ] Nivel de permissões de usuário (
    criar/editar/deletar artigo,
    deletar outro usuário,
    ler todos usuários
  ),
  (
    reader (pode comentar em um post),
    writer (recebe a permissão anterior, cria, edita e deleta os seus posts),
    moderador (
      recebe a permissão anterior, edita e deleta os posts de outros usuários
      e pode enviar as contas dos usários mal intensionads para um admin deleta-lo (se necessário for) 
    )
    admin (recebe a permissão anterior, ler todos users, deleta users, ),
  )

- [ ] ler todos usuários (somente para admins autenticados)

E talves mais coisas realmente necessárias

 - colocar comentarios em portugues

 - criar uma ideia de microserviço para um forum

 - no forum a gente poderia usar web socket 
