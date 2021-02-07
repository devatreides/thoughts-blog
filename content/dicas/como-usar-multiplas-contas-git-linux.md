---
slug: como-usar-multiplas-contas-git-linux
title: Como usar contas GIT por diretório no Linux
description: Organize seus repositórios por conta GIT sem muito estresse.
thumbnail: thumb.png
author: Tom Benevides
avatar: tom-benevides.jpg
date: 07 de Fevereiro de 2021
contact: https://twitter.com/tongedev
dateOrder: 2021-02-07
typeArticle: original
---
***

Em geral, uma das primeiras ferramentas que o desenvolvedor aprende quando começa
sua jornada dev é o **git**. Pra quem ainda não conhece muito sobre esse carinha,
ele foi criado por *Linus Benedict Torvalds*, um engenheiro de software Finlandês,
naturalizado americano, que é conhecido por ser o criador do **kernel Linux**. A
idéia de *Torvalds* era ter um sistema de versionamento simples e que atendesse a
três requisitos que ele próprio considerava indispensáveis (e que outros softwares
não conseguiam garantir):

- Precisava ser distribuído;
- A performance tinha que ser boa;
- Precisava garantir que o que era colocado, era exatamente o que se obtinha depois;

Segundo ele, esses três parâmetros foram suficientes para descartar praticamente
todos os sistemas de versionamento até então, por isso, decidiu construir o seu
próprio sistema.

## Uma conta git no Linux: coisa de criança

Todo mundo que já configurou um usuário git local sabe que não tem nenhum segredo.
Define-se o nome do usuário e o email e pronto.

```shell
git config --global user.name "Tom Benevides"
git config --global user.email "tombenevides@pessoal.com"
```

A partir de agora, todos os repositórios que vc criar, vão usar essas credenciais.

```shell
mkdir new_repo && cd "$_"
git init
touch text.txt
git add text.txt
git commit -m "new file"
```
E se eu der uma olhada no log de commits (*git log*), esse vai ser o resultado:
```shell
commit 036573401e5788917383a27fb6c2acf607f5e441 (HEAD -> master)
Author: Tom Benevides <tombenevides@pessoal.com>
Date:   Sun Feb 7 13:50:05 2021 -0400

    new file
```
Então, tudo certo com nossa configuração. Mas e se meu projeto usa uma conta diferente?

## Conta git por repositório: é fácil mas pode ficar trabalhoso

Vamos agora criar mais um repositório. Esse vai ser o *work_repo*. Ele na verdade usa
uma conta diferente de email porque é um projeto da empresa que trabalho e não um projeto
pessoal como o *new_repo*.

```shell
cd ~
mkdir work_repo && cd "$_"
git init
touch text.txt
```
Se fizermos um commit das alterações agora, ficará registrada a minha conta pessoal
(padrão do sistema), mas eu preciso usar o email do trabalho, **tombenevides@trabalho.com**.
Assim, precisamos configurar as novas credenciais no repositório.

```shell
git config user.email "tombenevides@trabalho.com"
git add text.txt
git commit -m "new file"
```

Agora sim, ao fazer o commit, meu email registrado será o do trabalho.

```shell
commit f47e5c7140296c9fbe1f4fb001149b04b329b655 (HEAD -> master)
Author: Tom Benevides <tombenevides@trabalho.com>
Date:   Sun Feb 7 14:05:02 2021 -0400

    new file
```

Tudo certo, final feliz? Mais ou menos. Imagine agora que vc tenha vários repositórios
de trabalho e vários repositórios pessoais. Já vai ser meio chato você ter que configurar
a credencial correta em cada um dos repositórios, e se seu email da conta do trabalho mudar?
Precisará fazer a alteração em todos os repositórios. Baita trabalho né? Tem gente que não acha.

Pessoalmente, o que eu puder fazer pra deixar minha vida mais simples, estou fazendo, e uma
ideia legal seria configurar o git pra que toda vez que eu criasse um repositório em determinado
diretório, automaticamente já fosse atribuído ao mesmo as credenciais que eu quero. E olha só
que bacana, o git faz isso!

## Conta git por diretório: a luz no fim do túnel da preguiça

a ideia é a seguinte: vamos ter dois diretórios base (*Trabalho* e *Pessoal*) onde
os repositórios serão armazenados de acordo com sua respectiva origem. E todos os
repositórios dentro de cada diretório base, usarão as mesmas credenciais, diferentes da
padrão e sem configuração por repositório. Estrutura de repositórios abaixo.

```shell
Projetos
├── Pessoal
└── Trabalho
```

Agora, precisamos dizer ao git que os repositórios da pasta *Pessoal* usarão o email
"**tombenevides@novopessoal.com**" e não o email padrão que configuramos mais cedo.
Para isso, na sua home (`cd ~`) crie um arquivo chamado *.gitconfig-pessoal* e como conteúdo,
simplesmente defina o email.

Conteúdo do arquivo *.gitconfig-pessoal*:
```shell
[user]
  email = tombenevides@novopessoal.com
```

Uma vez que configuramos a credencial do diretório *Pessoal*, vamos criar um arquivo
*.gitconfig-trabalho* para configurar o email de trabalho.

Conteúdo do arquivo *.gitconfig-trabalho*:
```shell
[user]
  email = tombenevides@trabalho.com
```

Com nossos arquivos de configuração criados, vamos agora editar o arquivo *.gitconfig* que
se encontra na home do perfil (`cd ~`) e vamos dizer ao git que toda vez que houver um
repositório dentro do diretório *Pessoal*, ele deve usar a credencial do arquivo *.gitconfi-pessoal*,
e toda vez que houver um repositório no diretório *Trabalho*, o git deve usar a credencial do
arquivo *.gitconfig-trabalho*.

Arquivo *.gitconfig* editado:
```shell
[user]
    name = Tom Benevides
    email = tombenevides@pessoal.com
[includeIf "gitdir:Projetos/Pessoal/**"]
  path = .gitconfig-pessoal
[includeIf "gitdir:Projetos/Trabalho/**"]
  path = .gitconfig-trabalho
```

... e voilà! Agora, os repositórios do trabalho só precisam estar dentro do diretório
*~/Projetos/Trabalho* e todos os commits usarão as credenciais corretas, sem
necessidade de configuração por repositório. O mesmo vale para os do diretório Pessoal.
E se em algum momento, o seu email da conta git do trabalho (ou pessoal) mudar,
é só alterar o arquivo *.gitconfig-X* correspondente à pasta e todos os repositórios
lá dentro usarão a nova credencial.

Então, é isso! Tenta aí e depois me conte sua experiência via [Twitter](https://twitter.com/tongedev) ou [Instagram](https://instagram.com/tomb.dev)!