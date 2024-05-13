<h1 align="center">My Next Game - Site de Video Games</h1>


<br/>
<br/>

<p align="center">
  <img  
       width="30%" 
       src="https://user-images.githubusercontent.com/69987890/180659584-2e8cdf69-1285-4a47-a0a3-0bae656b94e9.png" 
       alt="logo do site My Next Game">
  </img>
</p>

<br/>
<br/>

My Next Game é uma aplicação web que utiliza as APIs <a href="https://api-docs.igdb.com/#about" target="_blank" rel="noreferrer">IGDB</a> e <a href="https://github.com/ckatzorke/howlongtobeat" target="_blank" rel="noreferrer">HowLongToBeat</a> para mostrar várias informações de jogos, o preço e seu tempo de duração até completa-lo.

## :hammer: Funcionalidades

- [x] `Crie sua conta`: Salve seus jogos favoritos e visualize a qualquer hora.
- [x] `Procure o seu próximo jogo`: Use o sistema de busca suportado pela API da Twitch e ache o jogo que quiser.
- [x] `Quanto tempo leva pra terminar?`: Saiba quantas horas cada jogo leva para terminar.

## :hammer: Como rodar o projeto?

 Crie um arquivo `.env` na pasta `front_end` com as seguintes informações:

```javascript
API_RENDER_URL=[url de onde foi feito o deploy do backend]/api
```

 Crie um arquivo `.env` na pasta `back_end` com as seguintes informações:

```javascript
PORT=[número da porta que rodará]
CLIENT_ID=[identificação dada pela twitch para o uso da API IGDB]
CLIENT_SECRET=[outra informação dada pela twitch]
JWT_SECRET=[segredo para descriptografar os dados pelo JWT]
MONGODB_URL=[URL do banco de dados, no meu caso, vindo do MongoDB]
```

## :heavy_check_mark: Tecnologias Utilizadas

- ``Next.js``
- ``TypeScript``
- ``Styled Components``
- ``Redux``
- ``MongoDB``
- ``Mongoose``
- ``Express``
- ``Axios``
- ``bcrypt``
- ``Dotenv``
