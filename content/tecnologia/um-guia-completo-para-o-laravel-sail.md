---
slug: um-guia-completo-para-o-laravel-sail
title: Um guia completo para o Laravel Sail
description: Ou o por quê de você talvez não precisar dele.
thumbnail: thumb.jpg
author: Tom Benevides
avatar: tom-benevides.jpg
date: 19 de fevereiro de 2021
contact: https://twitter.com/tongedev
dateOrder: 2021-02-19
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

**O service `redis`**

O service `redis` é muito similar ao `mysql`:

>```yaml
>redis:
>    image: 'redis:alpine'
>    ports:
>        - '${FORWARD_REDIS_PORT:-6379}:6379'
>    volumes:
>        - 'sailredis:/data'
>    networks:
>        - sail
>```

Nós definimos a tag `alpine` para a [imagem oficial](https://hub.docker.com/_/redis) do Redis ([Alpine é uma distribuição inux leve](https://alpinelinux.org/)) e definimos também qual porta encaminhar; então declaramos um volume para persistir os dados e também conectar o contêiner à rede `sail`.

**O service `laravel.test`**

O service `laravel.test` é mais complexo:

>```yaml
>laravel.test:
>    build:
>        context: ./vendor/laravel/sail/runtimes/8.0
>        dockerfile: Dockerfile
>        args:
>            WWWGROUP: '${WWWGROUP}'
>    image: sail-8.0/app
>    ports:
>        - '${APP_PORT:-80}:80'
>    environment:
>        WWWUSER: '${WWWUSER}'
>        LARAVEL_SAIL: 1
>    volumes:
>        - '.:/var/www/html'
>    networks:
>        - sail
>    depends_on:
>        - mysql
>        - redis
>        # - selenium
>```

Para os iniciantes, o nome é um pouco confuso, mas esse service é o que vai lidar com o PHP (ou seja, o que serve a aplicação Laravel). Logo depois, há uma chave `build` que não tínhamos visto visto antes, que aponta para o [`Dockerfile`](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/Dockerfile) que está presente no diretório `vendor/laravel/sail/runtimes/8.0`.

[Dockerfiles](https://docs.docker.com/engine/reference/builder/) são documentos contendo instruções para construir imagens. Em vez de baixar e usar uma imagem existente no Docker Hub, o time do Laravel escolheu descrever sua própria em um Dockerfile. A primeira vez que rodamos o comando `sail up`, nós contruimos essa imagem e criamos um contêiner baseado nela.

Abra o Dockerfile e dê uma olhada na primeira linha:

>```yaml
>FROM ubuntu:20.04
>```

Isso significa que a tag `20.04` da [imagem](https://hub.docker.com/_/ubuntu) `ubuntu` é usada como ponto de início para a imagem customizada; o resto do arquivo é essencialmente uma lista de instruções para construir sobre ela, instalando tudo que uma aplicação Laravel padrão precisa. Isso inclui PHP, várias extensões e outros pacotes como Git e Supervisor, assim como o Composer.

O final do arquivo também merece uma rápida explicação:

>```yaml
>COPY start-container /usr/local/bin/start-container
>COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
>COPY php.ini /etc/php/8.0/cli/conf.d/99-sail.ini
>RUN chmod +x /usr/local/bin/start-container
>
>EXPOSE 8000
>
>ENTRYPOINT ["start-container"]
>```

Nós podemos ver que um punhado de arquivos locais são copiados para o contêiner:

- o arquivo [`php.ini`](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/php.ini) é uma configuração customizada para o PHP;
- o arquivo [`supervisord.conf`](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/supervisord.conf) é um arquivo de configuração para o [Supervisor](http://supervisord.org/), um gerenciador de processo aqui responsável por iniciar o processo PHP;
- o arquivo [`start-container`](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/start-container) é um script bash que executará algumas coisas toda vez que o contêiner iniciar, porque está definido como [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) do contêiner. Podemos ver que se torna um executável pela instrução `RUN chmod +x`;
- Finalmente, `EXPOSE 8000` não faz nada, além de informar ao leitor que este contêiner escuta na porta especificada em tempo de execução (o que na verdade parece errado aqui, já que a aplicação é servida na porta 80, não 8000).

Outras coisas estão acontecendo nesse Dockerfile, mas o descrito acima é a essência dele. Note que esse arquivo pertence ao PHP 8.0, mas o Laravel Sail também vem com uma [versão 7.4](https://github.com/laravel/sail/blob/1.x/runtimes/7.4/Dockerfile) que você pode apontar do service `laravel.test` no `docker-compose.yml`.

O service também possui uma seção `depends_on` contendo uma lista de services cujos contêineres devem ser executados com prioridade ao da aplicação Laravel. Já que este referencia tanto MySQL quanto Redis, eles devem ser iniciados primeiro para evitar erros de conexão.

O resto das configurações devem ser familiares a essa altura, então vou ignorá-las.

**Os services `selenium`, `memcached` e `mailhog`**

Esses são os services menores que me referi anteriormente; `selenium` e `mailhog` estão documentados [aqui](https://laravel.com/docs/sail#laravel-dusk) e [aqui](https://laravel.com/docs/sail#previewing-emails), e o `memcached` não parece ser usado durante o período de codificação. O ponto é: eles funcionam da mesma forma que os outros: baixam imagens existentes do Docker Hub e as usam como estão, com uma mínima configuração.

### O script `sail`

Se vc seguiu as [instruções de instalação do Laravel](https://laravel.com/docs/installation#your-first-laravel-project) para o seu sistema operacional, você teve que executar o seguinte comando em algum momento:

>```bash
>$ ./vendor/bin/sail up
>```

O arquivo [`sail`](https://github.com/laravel/sail/blob/1.x/bin/sail) que nós chamamos aqui é um script bash essencialmente adicionando uma camada mais amigável (user-friendly) em cima de comandos Docker um pouco prolixos.

Vamos abrí-lo agora para uma olhar mais de perto (fique tranquilo se você não é familiarizado com bash - é bem simplório).

Nós podemos ignorar toda a primeira parte do arquivo e focar no grande `if` que começa mais ou menos assim:

>```bash
>if [ $# -gt 0 ]; then
>    # Source the ".env" file so Laravel's environment variables are available...
>    if [ -f ./.env ]; then
>        source ./.env
>    fi
>    # ...
>```

Em linguagem natural, o trecho `$# -gt 0` é traduzido para "se o número de argumentos for maior que 0", significando que toda vez que nós chamarmos o script `sail` com argumentos, a execução entrará nesse `if`. Em outras palavras, quando executamos o comando `./vendor/bin/sail up`, chamamos o script `sail` com o argumento `up` e a execução cai dentro do grande `if` onde o script busca uma condição compatível com o argumento `up`. Já que não há nenhuma, o script vai direto para o final do grande `if`, num tipo de "pega-todo" `else` que podemos ver aqui:

>```bash
># Pass unknown commands to the "docker-compose" binary...
>else
>    docker-compose "$@"
>fi
>```

O comentário já descreve o que está acontecendo - o script passa o argumento `up` no binário `docker-compose`. Em outras palavras, quando executamos `./vendor/bin/sail up` nós na verdade executamos `docker-compose up`, que é o [comando padrão do Docker Compose](https://docs.docker.com/compose/reference/up/) para iniciar os contêineres dos services listados no `docker-compose.yml`.

Esse comando baixa as imagens correspondentes primeiro se necessário e constrói a imagem do Laravel baseado no Dockerfile como conversamos mais cedo.

Testa pra ver! Execute `./vendor/bin/sail up` e depois `docker-compose up` - eles fazem a mesma coisa.

Vamos olhar um exemplo mais complicado, um envolvendo Composer, que está entre os pacotes instalados pelo Dockerfile da aplicação. Mas antes disso, vamos iniciar o Sail em [modo detached](https://laravel.com/docs/sail#starting-and-stopping-sail) para executar os contêineres em segundo plano:

>```bash
>$ ./vendor/bin/sail up -d
>```

O script `sail` nos permite executar comandos Composer, por exemplo:

>```bash
>$ ./vendor/bin/sail composer --version
>```

O comando acima chama o script `sail` com `composer` e `--version` como argumentos, o que significa que a execução vai entrar no grande `if` de novo. Vamos procurar pela condição que lida com o Composer:

>```bash
># ...
># Proxy Composer commands to the "composer" binary on the application container...
>elif [ "$1" == "composer" ]; then
>    shift 1
>
>    if [ "$EXEC" == "yes" ]; then
>        docker-compose exec \
>            -u sail \
>            "$APP_SERVICE" \
>            composer "$@"
>    else
>        sail_is_not_running
>    fi
>    # ...
>```

A primeira linha da condição começa com um `shift`, que é o comando bash que pula tantos argumentos quanto o número em seguida a ele. Nesse caso, `shift 1` pula o argumento `composer`, fazendo `--version` o novo primeiro argumento. O programa então verifica se o Sail está rodando, antes de executar um comando esquisito dividido em 4 linhas, que eu separei abaixo:

>```bash
>docker-compose exec \
>    -u sail \
>    "$APP_SERVICE" \
>    composer "$@"
>```

O `exec` é a forma do Docker Compose nos permitir executar comandos em contêineres já iniciados. O `-u` é uma opção que indica qual usuário nós queremos que execute o comando e `$APP_SERVICE` é o contêiner que vai receber o comando. Aqui, seu valor é `laravel.test`, que é o nome do service no `docker-compose.yml` como explicado anteriormente. É seguido do comando que nós queremos rodar uma vez que estivermos no contêiner, chamado `composer` e seguido de todos os argumentos. Este agora contém apenas `--version`, já que nós pulamos o primeiro argumento.

Em outras palavras, quando nós executamos:

>```bash
>$ ./vendor/bin/sail composer --version
>```

O comando que é executado por trás dos panos é o seguinte:

>```bash
>$ docker-compose exec -u sail "laravel.test" composer "--version"
>```

Seria um pouco difícil escrever esse comando toda vez; por isso o script `sail` fornece atalhos para eles, fazendo a experiência de usuário ser mais suave.

Dê uma olhada no resto dos condicionais `if` dentro do maior para ver o que mais é contemplado - você verá praticamente o mesmo princípio aplicado em todo lugar.

____

Existem algumas outras funcionalidades abstraídas (como [tornar púclico um contêiner local](https://laravel.com/docs/sail#sharing-your-site)), mas nós cobrimos o substancial sobre o que o Laravel Sail oferece atualmente. Embora isso já seja ótimo começo, é de alguma forma limitado, mesmo para uma aplicação básica. A boa notícia é que a equipe do Laravel está ciente disso e construiu o ambiente com a extensão em mente:

> Uma vez que Sail é apenas Docker, você está livre para customizar praticamente tudo sobre ele ([Documentação Laravel](https://laravel.com/docs/sail#sail-customization))

## Estendendo o Laravel Sail

O código desta seção também está disponível no [repositório do Github](https://github.com/osteel/laravel-sail-extended), que você pode consultar a qualquer momento.

Nós vamos explorar três maneiras de estender o Laravel Sail, usando o [MongoDB](https://www.mongodb.com/) como pretexto; mas antes de fazermos, vamos garantir que temos acesso ao máximo de arquivos que conseguimos. A única coisa que temos acesso inicialmente é o arquivo [`docker-compose.yml`](https://github.com/laravel/sail/blob/1.x/stubs/docker-compose.yml), mas nós podemos publicar mais assets com o seguinte comando, que irá criar um diretório `docker` na raiz do projeto:

>```bash
>$ ./vendor/bin/sail artisan sail:publish
>```

Vamos voltar nisso daqui a pouco; por agora, vamos tentar instalar o pacote [`Laravel MongoDB`](https://github.com/jenssegers/laravel-mongodb), que vaia tornar fácil usar o MongoDB com nosso framework favorito:

>```bash
>$ ./vendor/bin/sail composer require jenssegers/mongodb
>```

Infelizmente, o Composer está reclamando sobre alguma extensão faltando:

>```bash
>mongodb/mongodb[dev-master, 1.8.0-RC1, ..., v1.8.x-dev] require ext-mongodb ^1.8.1 -> it is missing from your system. Install or enable PHP's mongodb extension
>```

Vamos resolver isso!

### Instalando extensões adicionais

Anteriormente neste posto, nós conversamos sobre a forma como o Sail usa Dockerfiles para construir imagens compatíveis com os requisitos do Laravel para PHP 7.4 e PHP 8.0. Esses arquivos foram publicados com o comando que rodamos no início dessa seção - tudo o que precisamos fazer para adicionar extensões é editá-los e reconstruir (rebuild) as imagens correspondentes.

Muitas extensões estão disponíveis e podemos listá-las com o comando:

>```bash
>$ ./vendor/bin/sail php -m
>```

MongoDB não é uma delas; para adicioná-la, abra o arquivo `docker/8.0/Dockerfile` e encontre a instrução `RUN` (a que está instalando vários pacotes):

>```yaml
>RUN apt-get update \
>    && apt-get install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin \
>    && mkdir -p ~/.gnupg \
>    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
>    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
>    && apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
>    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu focal main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
>    && apt-get update \
>    && apt-get install -y php8.0-cli php8.0-dev \
>       php8.0-pgsql php8.0-sqlite3 php8.0-gd \
>       php8.0-curl php8.0-memcached \
>       php8.0-imap php8.0-mysql php8.0-mbstring \
>       php8.0-xml php8.0-zip php8.0-bcmath php8.0-soap \
>       php8.0-intl php8.0-readline \
>       php8.0-msgpack php8.0-igbinary php8.0-ldap \
>       php8.0-redis \
>    && php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
>    && curl -sL https://deb.nodesource.com/setup_15.x | bash - \
>    && apt-get install -y nodejs \
>    && apt-get -y autoremove \
>    && apt-get clean \
>    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/
>```

É fácil encontrar o bloco relacionado com as extensões PHP uma vez que todas começam com `php8.0`. Edite final da lista para ficar como abaixo:

>```bash
>php8.0-redis php8.0-mongodb \
>```

Você pode ver os detalhes das extensões PHP disponíveis para o Ubuntu 20.04 [aqui](https://packages.ubuntu.com/focal/php/). Salve o arquivo e rode o comando:

>```bash
>./vendor/bin/sail build
>```

Isso vai percorrer todos os services no arquivo `docker-compose.yml` e construirá as imagens correspondentes se elas tiverem mudado, incluindo o service `laravel.test`, cujo Dockerfile acabamos de atualizar. Uma vez que está pronto, inicie os contêineres de novo:

>```bash
>./vendor/bin/sail up -d
>```

Esse comando vai detectar que a imagem correspondente ao service `laravel.test` mudou e recriará o contêiner. É isso! A extensão do MongoDB pra PHP agora está instalada e disponível. Nós fizemos isso apenas para a imagem PHP 8.0, mas você pode aplicar o mesmo processo no PHP 7.4 atualizando o arquivo `docker/7.4/Dockerfile`, com a extensão `php7.4-mongodb`. Nós agora podemos seguramente importar o pacote Laravel:

>```bash
>./vendor/bin/sail composer require jenssegers/mongodb
>```

Próximo passo: adicionar um service Docker para o MongoDB.

### Adicionando novos services

MongoDB é essencialmente outro banco de dados; como resultado, o service correspondente será muito similar com os do MySQL e Redis. Uma busca rápida no [Docker Hub](https://hub.docker.com/) revela que existe uma [imagem oficial](https://hub.docker.com/_/mongo) para isso, que é o que nós vamos usar.

Sua documentação contém uma configuração de exemplo para o Docker Compose, que nós vamos copiar e ajustar às nossas necessidades. Abra o arquivo `docker-compose.yml` e adicione o seguinte service no final, após o do `mailhog`:

>```yaml
>mongo:
>    image: 'mongo:4.4'
>    restart: always
>    environment:
>        MONGO_INITDB_ROOT_USERNAME: '${DB_USERNAME}'
>        MONGO_INITDB_ROOT_PASSWORD: '${DB_PASSWORD}'
>        MONGO_INITDB_DATABASE: '${DB_DATABASE}'
>    volumes:
>        - 'sailmongo:/data/db'
>    networks:
>        - sail
>```

As mudanças que eu fiz foram as seguintes: primeiro, eu especifico a tag `4.4` da imagem `mongo`. Se você não especificar uma, o Docker Compose vai baixar a tag `latest` por padrão, que não é uma boa prática uma vez que irá referenciar diferentes versões do MongoDB ao longo do tempo, conforme novas releases forem disponibilizadas. A introdução de breaking changes pode criar instabilidade no seu setup Docker, então é melhor apontar a versão específica, compatível com o ambiente de produção sempre que possível.

Então, eu declaro uma variável de ambiente `MONGO_INITDB_DATABASE` para o contêiner criar o banco com o nome correspondente ao iniciar e eu combinei o valor de cada variável de ambiente com as do arquivo .env (vamos voltar aqui daqui a pouco).

Eu também adicionei uma seção `volumes`, montando um volume gerenciado pelo Docker no diretório `/data/db` do contêiner. O mesmo princípio do MySQL e Redis são aplicados aqui: se você não persistir os dados na sua máquina local, será perdido toda vez que o contêiner MongoDB for destruído. Em outras palavras, como os dados do MongoDB são salvos no diretório `/data/db`, nós persistimos essa pasta localmente usando um volume.

Como esse volume não existe ainda, nós precisamos declará-lo no final do `docker-compose.yml`, depois dos outros dois:

>```yaml
>volumes:
>    sailmysql:
>        driver: local
>    sailredis:
>        driver: local
>    sailmongo:
>        driver: local
>```

Finalmente, eu adiciono a seção `networks` para garantir que o service está na mesma rede que os outros. Nós podemos agora configurar o Laravel MongoDB de acordo com as [instruções](https://github.com/jenssegers/laravel-mongodb#configuration) do pacote. Abra o arquivo `config/database.php` e adicione a seguinte conexão de banco de dados:

>```php
>'mongodb' => [
>    'driver' => 'mongodb',
>    'host' => env('DB_HOST'),
>    'port' => env('DB_PORT'),
>    'database' => env('DB_DATABASE'),
>    'username' => env('DB_USERNAME'),
>    'password' => env('DB_PASSWORD'),
>    'options' => [
>        'database' => env('DB_AUTHENTICATION_DATABASE', 'admin'),
>    ],
>],
>```

Abra o arquivo `.env` na raiz do projeto e mude os valores de banco de dados como seguinte:

```bash
DB_CONNECTION=mongodb
DB_HOST=mongo
DB_PORT=27017
DB_DATABASE=laravel_sail
DB_USERNAME=root
DB_PASSWORD=root
```

O código acima faz do MongoDB a conexão de banco de dados principal; em um caso real, você talvez queira fazer dele um banco secundário como o Redis, mas para propósitos de demonstração, isso vai servir. O `DB_HOST` é o nome do service MongoDB; por trás dos panos, o Docker Compose resolve o nome do service para o IP do contêiner na rede que ele gerencia (em nosso caso, é apenas a rede `sail` definida no final do `docker-compose.yml`). `DB_PORT` é a porta do MongoDB que está disponível, que é a `27017` por padrão, de acordo com a [descrição da imagem](https://hub.docker.com/_/mongo).

Nós estamos prontos para o teste! Execute o seguinte comando de novo:

>```bash
>$ ./vendor/bin/sail up -d
>```

Vai baixar a imagem do MongoDB, criar o novo volume e iniciar o novo contêiner, que também criará o banco de dados `laravel_sail`. Vamos garantir isso rodando as migrations padrões do Laravel:

>```bash
>$ ./vendor/bin/sail artisan migrate
>```

Podemos levar o teste mais longe atualizando o model `User` para estender o model `Authenticable` do MongoDB:

>```php
><?php
>
>namespace App\Models;
>
>use Illuminate\Contracts\Auth\MustVerifyEmail;
>use Illuminate\Database\Eloquent\Factories\HasFactory;
>use Illuminate\Notifications\Notifiable;
>use Jenssegers\Mongodb\Auth\User as Authenticatable;
>
>class User extends Authenticatable
>{
>    // ...
>```

Use o Tinker para tentar criar um registro:

>```bash
>$ ./vendor/bin/sail tinker
>
>Psy Shell v0.10.5 (PHP 8.0.0 — cli) by Justin Hileman
>
>\>>> \App\Models\User::factory()->create();
>```

Ótimo! Nossa integração do MongoDB é funcional.

Nós podemos continuar interagindo com isso usando o Tinker e Eloquent, mas muitas vezes é útil ter acesso direto ao banco de dados, através de softwares externos ou via interface de linha de comando como o [Mongo Shell](https://docs.mongodb.com/manual/mongo/). Vamos adicionar este último ao nosso setup.

### comandos Sail customizados

A boa notícia é que o Mongo Shell já está disponível, desde que saibamos a fórmula certa para invocá-lo. Aqui está ele, junto com alguns comandos extras para logar no banco de dados e listar os usuários (execute o primeiro comando da raiz do projeto):

>```bash
>$ docker-compose exec mongo mongo
>
>MongoDB shell version v4.4.2
>connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
>Implicit session: session { "id" : UUID("919072cf-817d-43a6-9ffb-c5e721eeefbc") }
>MongoDB server version: 4.4.2
>Welcome to the MongoDB shell.
>For interactive help, type "help".
>For more comprehensive documentation, see
>    https://docs.mongodb.com/
>Questions? Try the MongoDB Developer Community Forums
>    https://community.mongodb.com
>\> use admin
>switched to db admin
>\> db.auth("root", "root")
>1
>\> use laravel_sail
>switched to db laravel_sail
>\> db.users.find()
>```

O comando `docker-compose exec mongo mongo` parece familiar; mais cedo, no artigo, nós conferimos como o script `sail` trabalha por trás dos panos, o que consiste em traduzir simples comandos `sail` em comandos `docker-compose` mais complexos. Aqui, estamos falando para o binário do `docker-compose` executar o comando `mongo` no contêiner `mongo`. Pra ser justo, esse comando não é tão ruim e poderíamos facilmente nos lembrar dele; mas por consistência, seria legal ter um equivalente `sail` mais simples, como o seguinte:

>```bash
>$ ./vendor/bin/sail mongo
>```

Para fazer isso, precisamos de alguma forma editar o script `sail`, mas ele está localizado dentro do diretório `vendor` - que é criado pelo Composer - não podemos atualizá-lo diretamente. Precisamos de uma maneira para construir sobre ele sem modificá-lo, que eu resumi abaixo:

1. faça uma cópia do script `sail` na raiz do projeto;
2. Substitua o conteúdo do grande `if` com condicionais customizadas;
3. Se nenhuma das condicionais customizadas bate com os atuais argumentos, passe-os para o script `sail` original.

Se nós dermos uma olhada mais de perto para o arquivo `sail` com ls -la, poderemos ver que ele é um link simbólico para o arquivo `vendor/laravel/sail/bin/sail`:

<p align="center">
  <img width="60%" height="auto" src="/img/content/tecnologia/um-guia-completo-para-o-laravel-sail/sail-symbolic-link.png">
</p>

Vamos copiar esse arquivo para a raiz do nosso projeto agora:

>```bash
>$ cp vendor/laravel/sail/bin/sail .
>```

Abra a nova cópia e substitua o conteúdo do grande `if` com o seguinte, deixando o resto como está:

>```bash
>if [ $# -gt 0 ]; then
>    # Source the ".env" file so Laravel's environment variables are available...
>    if [ -f ./.env ]; then
>        source ./.env
>    fi
>
>    # Initiate a Mongo shell terminal session within the "mongo" container...
>    if [ "$1" == "mongo" ]; then
>
>        if [ "$EXEC" == "yes" ]; then
>            docker-compose exec mongo mongo
>        else
>            sail_is_not_running
>        fi
>
>    # Pass unknown commands to the original "sail" script..
>    else
>        ./vendor/bin/sail "$@"
>    fi
>fi
>```

No código acima, nós removemos todas os condicionais `if...else` dentro do grande `if` e adicionamos um nosso, que irá executar o comando que usamos antes para acessar o Mongo shell se o valor do primeiro argumento do script for `mongo`. Se não for, a execução irá bater no último `else` e chamar o script `sail` original com todos os argumentos.

Você pode tentar isso agora - salve o arquivo e execute o seguinte comando:

>```bash
>$ ./sail mongo
>```

Isso deve abrir uma sessão do Mongo shell no seu terminal.

Tente outro comando, pra ter certeza de que o script `sail` original está sendo chamado conforme esperado:

>```bash
>$ ./sail artisan
>```

O menu artisan deve aparecer.

É isso! Se você precisa de mais comandos, você pode adicioná-los com um novo `if...else` dentro do grande `if` da cópia do script `sail`, localizado na raiz do projeto. As coisas funcionam exatamente da mesma forma, exceto que agora você precisa executar `./sail` em vez de `./vendor/bin/sail` (ou atualize seu alias Bash se você criou um como sugerido pela [documantação](https://laravel.com/docs/sail#configuring-a-bash-alias)).

____

Agora estamos executando uma instância totalmente funcional do MongoDB como parte do nosso setup Docker, bem integrada com o Laravel Sail. Mas o MongoDB é um mero exemplo aqui - você pode fazer o mesmo com praticamente qualquer tecnologia que goste de usar.

Vá [dar uma olhada](https://hub.docker.com/) agora! A maioria das principais tecnologias possui imagens Docker - oficiais ou mantidas pela comunidade - com instruções simples de seguir. Na maioria dos casos, você terá uma instância local do software em execução, em minutos.

Provavelmente, há muito mais coisas que poderíamos fazer para personalizar o Laravel Sail, mas os três métodos descritos acima já devem te ajudar muito. Neste estágio, você pode estar pensando que o novo ambiente do Laravel tem muitas vantagens, talvez até mais do que você pensava inicialmente. Ainda assim, o objetivo deste artigo é evitar usá-lo...

Então, aonde eu quero chegar com isso?

>### Por quê não usar Takeout?
>Enquanto lia esta seção, pode ter ocorrido a você que as soluções existentes, como [Takeout](https://tech.osteel.me/posts/you-dont-need-laravel-sail), oferecem suporte ao MongoDB. Embora usar Sail em conjunto com alguma outra tecnologia seja [possível](https://mattstauffer.com/blog/how-to-use-takeout-to-add-new-services-to-laravel-sail-and-save-ram/) e compensaria algumas de suas limitações atuais, confiar no Takeout reintroduziria uma dependência externa em nosso setup. Em vez de apenas usar o Docker, agora esperaríamos que todos na equipe também instalassem e configurassem o Takeout em suas máquinas.
>
>O Sail abre caminho para que todo o ambiente de desenvolvimento seja gerenciado por um único arquivo `docker-compose.yml` que faz parte do código. Minha opinião é que, se seguirmos esse caminho, devemos abraçá-lo totalmente e fazer do Docker a única dependência externa.
>
>Isso não quer dizer que a Takeout não tenha utilidade alguma; faz muito sentido contornar alguns problemas de desempenho sobre os quais falaremos mais adiante neste artigo.

## Mas afinal, o que há de errado com o Laravel Sail?

Se você chegou tão longe no texto, você provavelmente está se perguntando o que há de errado com o Laravel Sail, ainda mais agora que sabemos até onde podemos ir. Deixe-me contar a você, então: uma vez que você entendeu tudo que eu expliquei nas seções anteriores, **você não precisa mais do Laravel Sail**. Isso mesmo - você pode pegar esse conhecimento e ir embora.

Mas antes de eu entrar em detalhes, vamos revisar alguns reais pontos problemáricos do Sail, embora eu espere que a maioria deles seja resolvida pela equipe do Laravel mais cedo ou mais tarde.

O primeiro tem a ver com os comandos `sail` customizados: Embora seja possível estender o script `sail` como demonstrado anteriormente, o processo é um pouco feio e um tanto trabalhoso. Os mantenedores do Sail poderia resolver isso extensão Bash explícita permitindo aos usuários adicionarem seus próprios atalhos ou publicando o script `sail` junto com os outros arquivos.

Segundo, a aplicação é servida por um servidor de desenvolvimento PHP. Eu não vou entrar em muitos detalhes aqui, mas como mencionado antes, o [Supervisor](http://supervisord.org/) gerencia o processo PHP no contêiner `laravel.test`; É [nessa linha](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/supervisord.conf#L5) que o Supervisor executa o comando `php artisan serve`, que inicia um servidor PHP de desenvolvimento por trás dos panos.

O ponto é que o ambiente não usa um servidor web apropriado (como o Nginx), o que significa que não podemos ter facilmente nomes de domínio locais, ou trazer HTTPS pro setup. Isso pode ser tranquilo pra prototipação rápida, mas desenvolvimentos mais elaborados irão, em geral, precisar disso.

A terceira questão é menos óbvia neste estágio: o que provavelmente acontecerá é que o Laravel adicionará mais e mais services ao Sail, para pelo menos estar no mesmo nível do Homestead. Isso significa que muitos softwares serão lançados para tentar atender a uma gama cada vez maior de aplicações, com qualquer um deles usando apenas um pequeno subconjunto dos services disponíveis.

Redis e Memcached já não são essenciais para a maioria das aplicações, mas a configuração inicia uma instância do primeiro por padrão e, embora o último esteja atualmente comentado, ainda confunde desnecessariamente o arquivo `docker-compose.yml`. Aposto que a equipe do Laravel está explorando maneiras de habilitar/desabilitar services (como Takeout ou [Laradock](https://laradock.io/) fazem), mas seja qual for a abordagem preferida, o resultado será o mesmo - um monte de coisas que você não precisa.

O quarto problema eu notei ao tentar clonar e executar uma nova instância do repositório deste artigo para teste. Embora o processo de criação de um novo projeto Laravel baseado no Sail funcione bem, não consegui encontrar as instruções adequadas para instalar e executar um existente.

Você não pode executar `./vendor/bin/sail up` porque o diretório `vendor` ainda não existe. Para que este diretório seja criado, você precisa executar `composer install`; mas se seu projeto depende de dependências presentes na imagem Docker, mas não em sua máquina local, `composer install` não funcionará. Você pode executar `composer install --ignore-platform-reqs` em vez disso, mas isso não parece certo. Deve haver uma maneira de instalar e executar um projeto existente sem depender de uma instância local do Composer e comandos desajeitados.


O último problema pertence a uma categoria separada, pois se refere ao Docker em geral e não especificamente ao Laravel Sail. Deve ser considerado com cuidado antes de descer a estrada Docker e merece uma seção própria.

## A baleia na cabana

A única advertência importante que parece estar ausente da conversa até agora está relacionada ao desempenho. Embora isso não deva afetar os usuários do Linux, se você executar o Docker Desktop em seu sistema, provavelmente terá longos tempos de carregamento, especialmente no macOS (parece que o uso do [WSL2](https://docs.docker.com/docker-for-windows/wsl/) no Windows pode atenuar essa lentidão).

Você pode ver por si mesmo agora: se estiver usando o Docker Desktop e o Sail estiver rodando, tente carregar a [página de boas-vindas do Laravel](http://localhost/) - você provavelmente notará um atraso.

Não vou entrar em muitos detalhes aqui, mas o motivo vem essencialmente do sistema de arquivos subjacente do host, que não funciona bem em diretórios locais montados. Como nós vimos, é assim que o Laravel Sail obtém o código fonte da aplicação no contêiner Laravel, daí a lentidão.

É aqui que uma abordagem como a do Takeout faz sentido, pois em vez de executar o PHP a partir de um contêiner Docker, eles esperam que os desenvolvedores o executem em sua máquina local (por exemplo, via [Valet](https://laravel.com/docs/valet)), o tempo todo fornecendo instâncias de services como MySQL ou MongoDB, oferecendo assim conveniência sem sacrificar o desempenho. Mas a partir do momento que você opta por executar o PHP por meio de um contêiner do Docker (como o Sail faz), o valor agregado do Takeout diminui, na minha opinião.

Existem estratégias para mitigar esses problemas de desempenho, mas a documentação do Laravel não menciona nenhuma delas, muito menos o fato de que o desempenho pode ser um problema, o que eu acho surpreendente.

Dito isso, você pode se sentir confortável o suficiente com o desempenho como ele é; Eu, por exemplo, estou bem com isso há anos, embora use o Docker Desktop no macOS. O ponto principal é que este aspecto deve ser considerado cuidadosamente antes de mover toda a sua configuração para uma solução executando PHP em um contêiner, seja o Laravel Sail ou qualquer outra coisa. Mas, uma vez que você tenha tomado essa decisão, e quer as outras questões sejam ou não resolvidas, a ideia principal deste artigo permanece a mesma.

## Você não precisa do Laravel Sail

Se você está pensando em construir algo substancial usando o Laravel Sail como seu ambiente de desenvolvimento, mais cedo ou mais tarde você terá que estendê-lo. Você se pegará mexendo nos Dockerfiles e, eventualmente, escrevendo seus próprios; tendo que adicionar alguns services ao `docker-compose.yml`; e talvez adicionando alguns comandos Bash customizados.

Quando chegar neste ponto, tem uma questão que você deve se fazer:

> **O que me impede de construir meu próprio setup?**

A resposta é *nada*. Uma vez que você está confortável estendendo o Laravel Sail, você já tem o conhecimento necessário para construir seu próprio ambiente.

Pense um pouco: o arquivo `docker-compose.yml` não é específico do Laravel Sail, é apenas como o Docker Compose funciona. O mesmo para os Dockerfiles - são coisas padrões do Docker. A camada Bash? É só isso mesmo - código Bash, e como você pôde ver, não é tão complicado.

Então, por que se restringir artificialmente dentro das restrições da Sail? E o mais importante: por que se limitar a usar o Docker no contexto do Laravel?

Sua aplicação pode iniciar como um monólito, mas nem sempre pode ser. Talvez você tenha um frontend separado e use o Laravel como a camada de API. Nesse caso, você pode querer que seu ambiente de desenvolvimento gerencie os dois; para executá-los simultaneamente e que interajam uns com os outros como fazem em um ambiente de teste ou em produção.

Se todo a sua aplicação for um [monorepo](https://en.wikipedia.org/wiki/Monorepo), a configuração do Docker e o script Bash podem estar na raiz do projeto e você pode ter suas aplicações de front-end e back-end em subdiretórios separados, por exemplo, sob um diretório `src`.

A visualização em árvore correspondente seria mais ou menos assim:

>```bash
>my-app/
>├── bash-script
>├── docker-compose.yml
>└── src/
>    ├── backend/
>    │   └── Dockerfile
>    └── frontend/
>        └── Dockerfile
>```

O arquivo `docker-compose.yml` declararia dois services - um para o back-end e outro para o front-end - ambos apontando para o respectivo Dockerfile de cada um.

Se o back-end e o front-end residem em repositórios diferentes, você pode criar um terceiro, contendo exclusivamente o seu ambiente de desenvolvimento Docker. Apenas adicione ao `.gitignore` o diretório src e complete seu script Bash para que ele coloque ambos os repositórios das aplicações dentro dele, usando os mesmos comandos que você normalmente executaria manualmente.

Mesmo que o seu projeto seja um monólito do Laravel, esse tipo de estrutura já é mais limpo do que misturar arquivos relacionados ao desenvolvimento com o resto do código-fonte. Além disso, se sua aplicação ficar maior e precisar de outros componentes além do Laravel, você já está em uma boa posição para suportá-los.

Depois de se esforçar para entender o Laravel Sail e estendê-lo, nada o impedirá de construir seus próprios ambientes de desenvolvimento, independentemente de o Laravel fazer parte da equação ou não. É isso mesmo, você pode construir ambientes baseados em Docker sob medida para qualquer coisa.

E se o Laravel fizer parte da pilha, nada o impede de reutilizar os Dockerfiles do Sail se você ainda não se sente confortável para escrever os seus; afinal, eles já estão otimizados para o Laravel. Da mesma forma, você pode se inspirar no arquivo docker-compose.yml do Sail, se isso ajudar.

## Conclusão

Não me leve a mal: o Laravel Sail tem muito a oferecer e estou feliz em ver um mantenedor tão estabelecido impulsionar a adoção do Docker para o desenvolvimento local.

Amamos nossos frameworks porque eles oferecem diretrizes para alcançar os resultados desejados de uma forma que sabemos ser eficiente e testada em batalha e é natural que eles também procurem fornecer o ambiente que permitirá que seus usuários as desenvolvam. Mas uma coisa que o Sail nos mostra é que isso não precisa mais fazer parte do encargo do framework.

Assim como o veleiro(sailboat) de Truman o ajuda a superar seu medo do mar e o leva às bordas do mundo artificial em que vive, o Sail revela os confins do Laravel e uma maneira de escapar deles.

Você pode sentir que o Sail é mais do que suficiente para suas necessidades hoje ou que ainda não está pronto para seguir seu próprio caminho. Isso é bom. Mas o Laravel sempre será limitado por sua natureza monolítica e conforme você crescer como desenvolvedor, chegará o dia em que sua aplicação Laravel será apenas um componente de um sistema maior, para o qual o Sail não será mais o suficiente. Eventualmente, seu pequeno veleiro colidirá com um cenário pintado.

>Truman hesita. Talvez ele não consiga continuar com isso, afinal. A câmera lentamente se aproxima do rosto de Truman.
>
>TRUMAN: "Caso eu não veja vocês - boa tarde, boa noite e durmam bem."
>
>Ele passa pela porta e sai.

____

E aí, gostou do conteúdo? Tem uma opinião sobre? Me conta qual é via [Twitter](*https://twitter.com/tongedev) ou [Instagram](https://www.instagram.com/tomb.dev/)!