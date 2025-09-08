// Lista de livros simplificada
const books = [
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        image: "https://i.imgur.com/f9EBgtq.png",
        link: "https://drive.google.com/file/d/1uyhWFFLlexNxXO0jAjImrlAiW6SXnYF7/view?usp=sharing"
    },
    {
        title: "O Cortiço",
        author: "Aluísio Azevedo",
        image: "https://i.imgur.com/GDxPDkO.png",
        link: "https://drive.google.com/file/d/1iqhIRHAES0x9nnQKTexioQP2xBjhU0ly/view?usp=sharing"
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://i.imgur.com/SbgRH0B.png",
        link: "https://drive.google.com/file/d/1CWhQAEBo6QrB7C7Ev8wRgqS8FWVaxbCv/view?usp=sharing"
    },
    {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        image: "https://i.imgur.com/FKCWA3G.png",
        link: "https://drive.google.com/file/d/1WA9n0gCzmSWTLGTEz12MYcvyjUkOlM_i/view?usp=sharing"
    },
    {
        title: "Os Lusíadas",
        author: "Luís Vaz de Camões",
        image: "https://i.imgur.com/hdzr6Z7.png",
        link: "https://drive.google.com/file/d/1ilSk_0FZW4owITJFlG6MHBiXh81raJ-1/view?usp=sharing"
    },
    {
        title: "Memórias Póstumas de Brás Cubas",
        author: "Machado de Assis",
        image: "https://i.imgur.com/uHso7UY.png",
        link: "https://drive.google.com/file/d/1hBNFA-v0UpqT460MEc_Xcpvudt9XUyTA/view?usp=sharing"
    },
    {
        title: "O Alienista",
        author: "Machado de Assis",
        image: "https://i.imgur.com/iQF4SZE.png",
        link: "https://drive.google.com/file/d/1AXBghFtfsJ2o8mgQQ7x0cVpFNvqYWhWE/view?usp=sharing"
    },
    {
        title: "Iracema",
        author: "José de Alencar",
        image: "https://i.imgur.com/duZtGbJ.png",
        link: "https://drive.google.com/file/d/1gylAtIrMZCRC-8EZcdN4O0M2txEyPkn_/view?usp=sharing"
    },
    {
        title: "O Jovem Aprendiz No Mercado de Trabalho",
        author: "Antonia Maria Gimenez, Fernanda Mayra Melo Santos, Luciana Rodrigues da Silva, Fernanda Mendes Caleiro",
        image: "https://i.imgur.com/mdsi487.png",
        link: "https://drive.google.com/file/d/1W__xBBIFWae2CWvmZxpoDdiw84OEl_GE/view?usp=sharing"
    },
    {
        title: "O Poder do Hábito",
        author: "Charles Duhigg",
        image: "https://i.imgur.com/HB899ck.png",
        link: "https://drive.google.com/file/d/1gylAtIrMZCRC-8EZcdN4O0M2txEyPkn_/view?usp=sharing"
    },
    {
        title: "Foco",
        author: "Daniel Goleman",
        image: "https://i.imgur.com/mYmjsIT.jpeg",
        link: "https://drive.google.com/file/d/16q-m_l4FctiPK2A79BF6nTxtZsIXLUyH/view?usp=sharing"
    },
];

// Função para criar um card de livro
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        ${book.link !== '#' ? '<a href="' + book.link + '" target="_blank" class="read-link">📖 Ler Online</a>' : ''}
    `;

    if (book.link !== '#') {
        card.addEventListener('click', () => {
            window.open(book.link, '_blank');
        });
    }

    return card;
}

// Função para exibir livros
function displayBooks(booksToShow, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    booksToShow.forEach(book => {
        container.appendChild(createBookCard(book));
    });
}

// Função para alternar seções
function showSection(sectionId) {
    // Ocultar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remover classe active de todos os links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Mostrar seção selecionada
    document.getElementById(sectionId).classList.add('active');

    // Adicionar classe active ao link clicado
    event.target.classList.add('active');

    // Carregar livros se necessário
    if (sectionId === 'books') {
        displayBooks(books, 'allBooks');
    }
}

// Função de busca
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (searchTerm === '') {
        displayBooks(books.slice(0, 4), 'featuredBooks');
        return;
    }

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    displayBooks(filteredBooks, 'featuredBooks');

    if (filteredBooks.length === 0) {
        document.getElementById('featuredBooks').innerHTML =
            '<p style="text-align: center; color: #666;">Nenhum livro encontrado.</p>';
    }
}

// Função para busca em tempo real
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            displayBooks(books.slice(0, 4), 'featuredBooks');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Exibir livros em destaque (primeiros 4)
    displayBooks(books.slice(0, 4), 'featuredBooks');

    // Configurar busca
    setupSearch();

});
