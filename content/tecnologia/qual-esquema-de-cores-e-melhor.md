---
slug: qual-esquema-de-cores-e-melhor
title: Qual esquema de cores é melhor?
description: Ou por que temas claros são melhores de acordo com a ciência.
thumbnail: thumb.png
author: Tom Benevides
avatar: tom-benevides.jpg
date: 26 de Outubro de 2020
contact: https://twitter.com/tongedev
dateOrder: 2020-10-26
typeArticle: translate
originalArticle: https://stitcher.io/blog/why-light-themes-are-better-according-to-science
originalAuthor: Brendt Roose
---
***

Como programador, eu penso que deveria sempre ter um olhar crítico quanto as ferramentas que uso e sempre tento otimizá-las, a despeito da minha própria preferência subjetiva. Foi fazendo isso que cheguei a conclusão de que esquemas de cores claras são melhores que esquemas de cores escuras  e hoje eu quero compartilhar esses pensamentos com você.

Antes de olhar a teoria, pegue um par de óculos de sol se você tiver algum jogado aí perto. Com os dois olhos abertos, cubra somente _um_ olho com a lente do óculos de sol. Fazendo isso, você estará vendo através de um óculos de sol com um olho e usando o outro como está acostumado a fazer.

Com tudo pronto, se divirta vendo este video em 3D!

<iframe width="100%" height="380" src="https://www.youtube.com/embed/IZdWlXjhMo4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Você viu o efeito 3D? Talvez não funcionou bem em algumas partes do video e em algumas você nem deve ter notado o efeito 3D por completo. Tudo bem, esse post não é sobre 3D, mas _é_ sobre a razão pela qual você pode ver aquele video em 3D com apenas um par de óculos de sol: o efeito de Pulfrich.

><h2>O efeito de Pulfrich</h2>
>
> O efeito de Pulfrich é uma percepção psicofísica onde o movimento lateral de um objeto no campo de visão é interpretado pelo cortex visual como um componente que possui
> profundidade, devido a uma diferença relativa nos tempos de sinal entre os dois olhos.

Aliás, todas as fontes estão listadas em um bloco de referências que você vai encontrar no final desse post.

Para esclarecer, o efeito 3D no video é na verdade o seu cérebro te enganando. Ele pensa que existe profundidade numa imagem plana porque há uma pequena diferença no tempo de leitura entre o seu olho esquerdo e o direito. Entretanto, o mais interessante é o que causa essa diferença no tempo entre os olhos. Pode adivinhar? É porque você cobriu um dos olhos com o óculos de sol. Acontece que imagens escuras levam mais tempo para serem processadas que imagens claras.

> O efeito de Pulfrich [...] produz um atraso de aproximadamente 15ms para um fator de 10 de diferença em relação a iluminância retinal média.

Apenas cobrindo um dos olhos com óculos de sol, você adicionou alguns milissegundos de atraso nesse olho. O exato tempo de atraso vai depender do brilho da tela e da escuridão do óculos de sol, o que pode explicar por que algumas pessoas veem o efeito 3D melhor que outras. O diferença de tempo entre seus olhos faz seu cérebro interpretar aquela imagem como possuindo profundidade, por isso... 3D.

Agora, na programação. Se você está usando um esquema de cores escuras, você está deliberadamente adicionando um atraso a mais, ou seja, o efeito de Pulfrich. Claro que a diferença parece desprezível, afinal, são só apenas alguns milissegundos. Na verdade, são alguns milissegundos _toda_ vez que você "re-escaneia" sua tela; isso acontece entre 10 e 50 vezes por segundo, dependendo de qual pesquisa você decidir acreditar. Mesmo assim, você provavelmente não vai notar nenhuma diferença em tempo real, mas com o tempo isso aumenta e o esforço extra que seus olhos precisam fazer pode ser bem exaustivo.

Além do efeito de Pulfrich, existem outras razões que fazem os esquemas de cores claras serem superiores. Primeiro, há há o que os olhos humanos estão acostumado, o que foram feitos para fazer. A maioria de nós está acordada durante o dia e dormindo a noite. O olho humano, é melhor adaptado para interpretar cenas claras com pontos escuros de foco em vez do contrário.

Por outro lado, tem o caso do Astigmatismo, que é causado por uma imperfeição das suas córneas ou cristalinos (lentes). É estimado que entre 30% a 60% dos adultos na Europa e Ásia possuem esse problema (Eu na verdade também tenho, e é por isso que eu uso óculos). Para pessoas com astigmatismo, uma tela brilhante com texto escuro é mais fácil de ler, porque a iris fecha um pouco mais dado a luz adicional; o que diminui o impacto do defeito na córnea ou cristalino.

Como uma nota adicional: se você experimenta com frequência dores de cabeça depois de um dia de programação, talvez queira fazer um teste para astigmatismo. Óculos fazem um mundo de diferença.

Por fim, existem extensos estudos sobre a legibilidade em telas de computador. Um por exemplo, é um estudo de Etienne Grandjean chamado "Ergonomic Aspects of Visual Display Terminals". Você não consegue lê-lo online; mas se conseguir encontrá-lo numa biblioteca, verifique as páginas 137-142. Sua conclusão, assim como vários outros estudos é a de que realmente é mais fácil ler textos escuros sobre um fundo claro, do que o contrário.

Frequentemente, quando eu compartilho esses argumentos com alguém que está apegado com o "lado negro" da força, costumam me falar que esquemas de cores claras machucam os olhos porque são muito brilhantes; você deve estar pensando a mesma coisa agora. Eu tenho duas respostas pra você:

_Primeira_: você não precisa usar um fundo branco `#FFF` com um texto preto `#000`. Existem muitos esquemas de cores claras que não vão nos extremos. O importante é haver contraste suficiente entre frente e fundo, e que o fundo seja mais claro que a frente.

_Segunda_: você sempre pode ajustar o brilho da sua tela. Você não precisa colocá-lo em 100%! Você somente faz isso se o texto de qualquer outra forma é ilegível e adivinhe quando isso acontece? Quando você usa um esquema de cores escuras!

***

No entanto, eu não quero terminar com teoria. Nos últimos 3 anos, eu tenho colocado os temas claros em teste: eu me desafiei e dezenas de outros a trocar para um tema claro por **uma semana**. Eu quero fazer o mesmo com você: tente por uma semana e me conte se você vai voltar para um tema escuro ou não. Baseado em minhas experiências anteriores, eu posso te dizer que somente algumas pessoas decidiram voltar atrás. A maioria continuou com temas claros porque, adivinha só, é realmente melhor.

Agora, eu reconheço que _existem_ pessoas que não conseguem usar esquemas de cor clara por causa de alguma enfermidade nos olhos. Esses são casos legítimos onde esquemas de cor escura _são_ melhores para saúde de algumas pessoas, as exceções à regra.

Então, tente aí e depois me conte suas descobertas via [Twitter](*https://twitter.com/tongedev) or [e-mail](mailto:tombenevides58@gmail.com)!

***

> Referências
>
> - [This Video Is 2D And 3D Simultaneously: the Pulfrich Effect](https://www.youtube.com/watch?v=Q-v4LsbFc5c)
> - [The Pulfrich effect, Wikipedia](https://en.wikipedia.org/wiki/Pulfrich_effect)
> - [Astigmatism, Wikipedia](https://en.wikipedia.org/wiki/Astigmatism)
> - [The Dark Side of Dark Mode](https://tidbits.com/2019/05/31/the-dark-side-of-dark-mode/)
