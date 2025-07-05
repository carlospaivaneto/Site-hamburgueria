#Site para Hamburgueria 🍔
Este é um projeto de um site institucional simples e moderno para uma hamburgueria, focado em apresentar o cardápio e direcionar os pedidos diretamente para o WhatsApp do estabelecimento. O layout é totalmente responsivo, adaptando-se a desktops, tablets e celulares.

##✨ Funcionalidades
Cardápio Dinâmico: Os produtos são carregados via JavaScript, facilitando a adição ou remoção de itens.

Carrinho de Compras: Sistema de carrinho funcional para que o cliente possa adicionar, remover e alterar a quantidade dos itens.

Integração com WhatsApp: Ao finalizar o pedido, uma mensagem formatada com os itens do carrinho e o valor total é gerada e enviada para a API do WhatsApp.

Layout Moderno: Design atraente e focado na experiência do usuário, construído com Bootstrap 5.

##📂 Estrutura dos Arquivos
O projeto é organizado de forma simples para facilitar a manutenção:

/
├── index.html      # Estrutura principal da página
├── style.css       # Estilos personalizados
└── script.js       # Lógica do cardápio e do carrinho

##🚀 Como Usar
Clone o repositório:

git clone https://github.com/carlospaivaneto/Site-hamburgueria.git

Abra o arquivo index.html no seu navegador para visualizar o site.

Personalize o site:

Número do WhatsApp: Abra o arquivo script.js e altere o número na linha abaixo:

const numeroWhatsApp = '5541999998888'; // Substitua por seu número

Cardápio: No mesmo arquivo (script.js), você pode editar a lista de produtos para adicionar, remover ou alterar os lanches:

const produtos = [
    {
        id: 1,
        nome: 'Seu Hambúrguer',
        descricao: 'Descrição do seu lanche.',
        preco: 25.00,
        imagem: 'url_da_sua_imagem.jpg'
    },
    // ... adicione mais produtos aqui
];

##🛠️ Tecnologias Utilizadas
HTML5

CSS3

JavaScript

Bootstrap 5

Font Awesome (para os ícones)

##📞 Contato e Personalização
Este é um modelo de site que pode ser totalmente personalizado para atender às necessidades do seu negócio.

Se você precisa de ajuda para customizar este projeto, adicionar novas funcionalidades ou criar algo do zero, entre em contato!

LinkedIn: Carlos Paiva Neto

WhatsApp: Clique aqui para conversar (91) 98439-8005
