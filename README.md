# Informativo
Este é um simples projeto onde é feito a implementação de um chat com socket.io, typescript e nodejs.

# Tecnologias Utilizadas
- TypeScript  
- Nodejs  
- Express  
- Socket.io  
- TypeORM  
- MySQL  

# Requisitos

- **Cadastro e Autenticação de Usuários**   
Permitir que usuários se cadastrem com informações básicas (nome, e-mail, senha).
Implementar login com autenticação para acesso ao chat, garantindo que apenas usuários autenticados possam utilizar o sistema.
Utilizar JWT para autenticação segura nas requisições.

- **Envio de Mensagens em Tempo Real**  
Permitir que os usuários enviem e recebam mensagens instantaneamente por meio de WebSockets.
Atualizar automaticamente o chat para todos os participantes em tempo real, sem necessidade de recarregar a página.

- **Criação e Gerenciamento de Salas de Chat**   
Permitir a criação de salas de chat temáticas, onde vários usuários podem participar de uma conversa.
Implementar gerenciamento de salas, permitindo que o usuário entre e saia de salas de chat à vontade.
Permitir a criação de chats privados entre dois usuários.

- **Notificação de Novas Mensagens**   
Exibir notificações de novas mensagens para os usuários que estão em outras salas ou que têm o aplicativo minimizado, para manter todos informados das novas mensagens.
Indicar visualmente mensagens não lidas em cada sala, com contagem de mensagens não lidas.

- **Histórico de Mensagens**  
Armazenar todas as mensagens enviadas e recebidas no banco de dados, para que os usuários possam consultar o histórico de conversas ao reabrir o chat.
Permitir que cada sala e chat privado tenha seu próprio histórico de mensagens que possa ser recuperado a qualquer momento.

- **Pesquisa de Mensagens e Conversas**   
Disponibilizar uma função de busca para que o usuário possa procurar mensagens específicas no histórico, com filtro por palavras-chave, data, ou remetente.

- **Sistema de Notificações de Presença**   
Exibir uma lista de usuários online em cada sala, para que todos saibam quem está participando ativamente do chat.
Indicar quando um usuário está digitando, para melhorar a interação entre os participantes.

- **Envio de Imagens e Arquivos**   
Permitir que os usuários enviem imagens e arquivos nas conversas.
Controlar o tamanho dos arquivos enviados para garantir que o sistema se mantenha rápido e não consuma recursos excessivos.

- **Configurações de Privacidade**  
Permitir que os usuários escolham a visibilidade de sua presença (online/offline) e definam quem pode iniciar chats privados com eles.
Oferecer a opção de bloquear outros usuários para que não possam enviar mensagens ou iniciar conversas privadas.

- **Painel de Administração**  
Fornecer uma interface para administradores onde eles possam monitorar atividades, gerenciar usuários (incluindo banimento, suspensão), e revisar denúncias de comportamento inadequado.
Permitir o fechamento de salas e a exclusão de mensagens, conforme necessário para manter a integridade do sistema.

