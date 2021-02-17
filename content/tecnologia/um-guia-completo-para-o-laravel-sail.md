---
slug: um-guia-completo-para-o-laravel-sail
title: Um guia completo para o Laravel Sail
description: Ou o por quê de você talvez não precisar dele.
thumbnail: thumb.jpg
author: Tom Benevides
avatar: tom-benevides.jpg
date: 17 de fevereiro de 2021
contact: https://twitter.com/tongedev
dateOrder: 2021-02-17
typeArticle: translate
originalArticle: https://tech.osteel.me/posts/you-dont-need-laravel-sail
originalAuthor: Yannick Chenot (Osteel)
---
***

> Truman continua a conduzir seu veleiro (sail) naufragado em direção ao horizonte. Tudo está calmo até que vemos a proa do barco bater de repente em uma enorme parede azul, derrubando Truman. Truman se recupera e atravessa o convés até a proa do barco. Pairando acima dele e fora do mar está um ciclograma de dimensões colossais. O céu para o qual ele está navegando nada mais é do que um cenário pintado (Andrew M. Niccol, [The Truman Show](http://www.dailyscript.com/scripts/the-truman-show_shooting.html))

Em 8 de dezembro de 2020, Taylor Otwell anunciou o lançamento do [Laravel Sail](https://laravel.com/docs/sail), um ambiente de desenvolvimento baseado em Docker, junto com uma grande revisão da documentação do Laravel:

<div style="display: table; margin: 0 auto;">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">
    📸 If you missed my stream walking through Laravel Sail and chatting about some of the documentation improvements, you can watch it here! Stream really starts at the timestamp in this link: <a href="https://t.co/U0otoNHg8U">https://t.co/U0otoNHg8U</a> 📸</p>&mdash; Taylor Otwell 💎 (@taylorotwell) <a href="https://twitter.com/taylorotwell/status/1336357588791947264?ref_src=twsrc%5Etfw">December 8, 2020</a>
  </blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

O anúncio causou uma onda de excitação pela comunidade, já que muitas pessoas identificaram o novo ambiente como uma forma de finalmente entrarem no mundo Docker; mas também deixou alguma confusão no ar, já que o Laravel Sail introduz uma abordagem para o desenvolvimento que é um pouco diferente de seus predecessores e não é exatamente um guia para se tornar um expert em Docker.

Este post trata do que esperar do Laravel Sail, como ele funciona e como tirar o máximo dele; é também um apelo aos desenvolvedores para quebrar essa barreira, em favor de uma solução própria e sob medida. Mas antes de chegarmos lá, nós precisamos olhar embaixo do convés, começando com uma explicação "alto nível" sobre o que é o Sail.

## O que é Laravel Sail?

Sail é o mais novo ambiente de desenvolvimento para Laravel. É a mais nova adição de uma longa lista de soluções oficiais como [Homestead](https://laravel.com/docs/homestead) e [Valet](https://laravel.com/docs/valet) de um lado, e esforços da comunidade como [Laragon](https://laragon.org/), [Laradock](http://laradock.io/), [Takeout](https://github.com/tighten/takeout) e [Vessel](https://vessel.shippingdocker.com/) de outro (de acordo com o [repositório do Github](https://github.com/laravel/sail#inspiration), Sail é muito inspirado neste último).

Laravel Sail é baseado em [Docker](https://www.docker.com/), uma tecnologia que aproveita contêineres para basicamente empacotar aplicativos para que possam ser executados de forma rápida e fácil em qualquer sistema operacional. O futuro do Sail parece brilhante, já que a documentação do Laravel já o coloca como a [forma indicada](https://laravel.com/docs/installation#your-first-laravel-project) de instalar e executar um projeto localmente, um lugar que Homestead e Valet ocuparam por anos.

## Como ele se compara aos seus predecessores?

Para refrescar a memória, Homestead é um Vagrant Box (uma máquina virtual) pré-empacotada com tudo que a maior parte das aplicações Laravel precisa, incluindo componentes essenciais como PHP, MySQL e um servidor web (Nginx), mas também tecnologias usadas com menos frequência como PostgreSQL, Redis e Memcached.

Valet, por sua vez, é um ambiente leve para MacOS focado em performance, dependendo de uma instalação local do PHP em vez de uma máquina virtual e destinado a ser usado em conjunto com outros serviços como [DBngin](https://dbngin.com/) ou Takeout para gerenciar outras dependências como bancos de dados.

Enquanto Homestead e Valet parecem diferentes no papel, promovem a mesma abordagem geral para ambientes locais, que é também compartilhada com a maior parte das soluções já mencionadas: eles tentam ser ambientes "engloba-tudo" para projetos Laravel e gerenciá-los sob o mesmo teto.

A abordagem do Sail é diferente, em que a descrição do ambiente de desenvolvimento é inslusa com o resto do código. Em vez de depender de uma solução de terceiros na máquina do desenvolvedor, o projeto vem com um conjunto de instruções Docker, para pegar e construir o ambiente correspondente.

A aplicação vem com baterias inclusas, exigindo somente um único comando para rodar o ambiente de desenvolvimento, independente do S.O. do desenvolvedor desde que o Docker esteja instalado. Também introduz a noção de um ambiente de desenvolvimento sob medida, o que, na minha opinião, é a real marca do Laravel Sail.

Embora essa abordagem seja um grande desvio do caminho tomado por soluções tradicionais, o Sail ainda tem algumas semelhanças com elas se tratando das ferramentas que o acompanham, algumas essencias, outras não.

Vamos revisar as mais importantes e a forma como foram implementadas.

## Como ele funciona?

A partir daqui, provavelmente vai ser mais fácil acompanhar junto com uma instalação limpa do Laravel, apesar dos arquivos que eu citar virem com links para o [repositório oficial no Github](https://github.com/laravel/sail). Se você tiver um pouco mais de tempo, siga as [instruções para o seu sistema operacional](https://laravel.com/docs/installation#your-first-laravel-project) agora e volte aqui quando terminar.

Sail é composto atualmente de 3 componentes principais: PHP, MySQL e Redis. Conforme a [documentação](https://laravel.com/docs/sail#introduction), o setup todo orbita ao redor de dois arquivos: [`docker-compose.yml`](https://github.com/laravel/sail/blob/1.x/stubs/docker-compose.yml) (que você vai encontrar na raiz do projeto depois da nova instalação) e o script [`sail`](https://github.com/laravel/sail/blob/1.x/bin/sail) (encontrado em `vendor/bin`).

### O arquivo `docker-compose.yml`

Como mencionado anteriormente, o Laravel Sail é baseado em Docker, que é uma tecnologia que se aproveita de contêineres. Como princípio básico, cada contêiner deve executar apenas um processo; simplificando, isso significa que cada contêiner deve executar apenas um pedaço do software. Se aplicarmos essa regra ao setup acima, nós vamos precisar de um contêiner para o PHP, outro para o MySQL e um terceiro para o Redis.

Esses contêineres constituem sua aplicação e eles precisam ser *orquestrados* para funcionarem corretamente. Existem várias formas de se fazer isso, mas o Laravel Sail depende do [Docker Compose](https://docs.docker.com/compose/) para fazer o trabalho, já que é a solução mais fácil e mais usada para setups locais.

O Docker Compose espera que descrevamos os vários componentes da nossa aplicação em um arquivp `docker-compose.yml`, no formato YAML. Se você abrir o que está na raiz do projeto em [uma nova aba](https://github.com/laravel/sail/blob/1.x/stubs/docker-compose.yml) (ou no seu editor de texto/código), você verá um parâmetro `version` no topo, abaixo o que seria a seção de `services` contendo a lista de componentes compreendendo os que já mencionamos antes: `laravel.test`, `mysql`, `redis`.

Irei descrever os services `mysql` e `redis` primeiro, uma vez que são mais simples que o `laravel.test`; Em seguida, cobrirei brevemente os outros, menores.

**O service `mysql`**

Como o nome sugere, o service `mysql` lida com o banco de dados MySQL:

> ```yaml
>mysql:
>    image: 'mysql:8.0'
>    ports:
>        - '${FORWARD_DB_PORT:-3306}:3306'
>    environment:
>        MYSQL_ROOT_PASSWORD: '${DB_PASSWORD}'
>        MYSQL_DATABASE: '${DB_DATABASE}'
>        MYSQL_USER: '${DB_USERNAME}'
>        MYSQL_PASSWORD: '${DB_PASSWORD}'
>        MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
>    volumes:
>        - 'sailmysql:/var/lib/mysql'
>    networks:
>        - sail
> ```

O parâmetro `image` indica qual *imagem* deve ser usada para este contêiner. Um jeito fácil de entender imagens e a diferença com contêineres é pegar emprestado os conceitos de orientação a objetos: se considerarmos uma imagem equivalente a uma classe, então um contêiner é uma instância dessa classe.

Aqui, nós especificamos que queremos usar a tag `8.0` da imagem `mysql`, correspondendo ao MySQL versão 8.0. Por padrão, imagens são baixadas do [Docker Hub](https://hub.docker.com/), que é o maior registro de imagens. Dê uma olhada na [página para o Mysql](https://hub.docker.com/_/mysql) - a maior parte das imagens vem com uma documentação simples explicando como usá-las.

A chave `ports` nos permite mapear as portas locais para as portas do contêiner, seguindo o formato `local:contêiner`. No *code snippet* acima, o valor da variável de ambiente `FORWARD_DB_PORT` (or `3306` se esse valor for vazio) é mapeado para a porta `3306` do contêiner. Isso é muito útil para conectar ferramentas externas ao banco de dados, como [MySQL Workbench](https://www.mysql.com/products/workbench/) ou [Sequel Ace](https://sequel-ace.com/); o setup deve funcionar também sem isso.

O parâmetro `enviroments` serve pra definir as variáveis de ambiente do contêiner. Aqui, a maioria delas recebe o valor de variáveis de ambiente existentes, que são carregadas no arquivo `.env` na raiz do projeto - o `docker-compose.yml` automaticamente detecta e importa o conteúdo desse arquivo. Por exemplo, na linha `MYSQL_ROOT_PASSWORD: '${db_password}'`, a variável de ambiente `MYSQL_ROOT_PASSWORD` do contêiner vai receber o valor de `DB_PASSWORD` vindo do arquivo `.env`.

Já o parâmetro `volumes` serve para declarar alguns arquivos ou diretórios como *volumes*, mapeando arquivos locais/diretórios específicos ou deixando o Docker lidar com isso. Aqui, um único volume gerenciado por Docker é definido: `sailmysql`. Esse tipo de volume precisa ser declarado em uma seção `volumes` separada, no mesmo nível dos `services`. Podemos encontrá-la no final do arquivo `docker-compose.yml`:

>```yaml
>volumes:
>    sailmysql:
>        driver: local
>    sailredis:
>        driver: local
>```

O volume `sailmysql` é mapeado para o diretório `/var/lib/mysql` no contêiner, que é onde os dados do MySQL são salvos. Esse volume garante que os dados serão persistidos mesmo quando o contêiner é destruído, o que acontece quando rodamos o comando `sail down`.

Finalmente, `networks` nos permite especificar em quais redes internas o contêiner poderá estar disponível. Aqui, todos os services são conectados pela mesma rede `sail`, que também é definida no final do `docker-compose.yml`, na seção `networks` acima da `volumes`:

>```yaml
>networks:
>    sail:
>        driver: bridge
>```

