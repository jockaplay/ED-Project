// Botão voltar
const botao = document.getElementById('backButton');
// Páginas
const cad_section = document.getElementById('cad_section');
const search_section = document.getElementById('search_section');
const show_section = document.getElementById('show_section');
const main_menu = document.getElementById('menu');

// Lista para auxiliar na troca de página.
const lista_sections = [cad_section, search_section, show_section]

// Criação do Nó

class Node {
    constructor(nome, idade, funcao) {
        this.nome = nome;
        this.idade = idade;
        this.funcao = funcao;
        this.proximo = null;
    }
}

// Inicio da estrutura hash table

class HashTable {
    constructor() {
        this.tamanho = 0;
        this.local = new Array(25).fill(null);
        // this.localLen = new Array(25).fill(0);
    }
    // método hash
    _hash(nome) {
        try {
            if (/^[a]/i.test(nome)) {
                return 0;
            } else if (/^[b]/i.test(nome)) {
                return 1;
            } else if (/^[c]/i.test(nome)) {
                return 2;
            } else if (/^[d]/i.test(nome)) {
                return 3;
            } else if (/^[e]/i.test(nome)) {
                return 4;
            } else if (/^[f]/i.test(nome)) {
                return 5;
            } else if (/^[g]/i.test(nome)) {
                return 6;
            } else if (/^[h]/i.test(nome)) {
                return 7;
            } else if (/^[i]/i.test(nome)){
                return 8
            } else if (/^[j]/i.test(nome)) {
                return 9;
            } else if (/^[k]/i.test(nome)) {
                return 10;
            } else if (/^[l]/i.test(nome)) {
                return 11;
            } else if (/^[m]/i.test(nome)) {
                return 12;
            } else if (/^[n]/i.test(nome)) {
                return 13;
            } else if (/^[o]/i.test(nome)) {
                return 14;
            } else if (/^[p]/i.test(nome)) {
                return 15;
            } else if (/^[q]/i.test(nome)) {
                return 16;
            } else if (/^[r]/i.test(nome)) {
                return 17;
            } else if (/^[s]/i.test(nome)) {
                return 18;
            } else if (/^[t]/i.test(nome)) {
                return 19;
            } else if (/^[u]/i.test(nome)) {
                return 20;
            } else if (/^[v]/i.test(nome)) {
                return 21;
            } else if (/^[w]/i.test(nome)) {
                return 22;
            } else if (/^[x]/i.test(nome)) {
                return 23;
            } else if (/^[y]/i.test(nome)) {
                return 24;
            } else if (/^[z]/i.test(nome)) {
                return 25;
            }
            else {
                alert('Insira um nome válido!')
                return null
            }
        } catch (error) {
            throw "Insira um nome válido.";
        }
    }

    // inserir
    cadastrar(pessoa) {
        document.getElementById('cad_name').value = '';
        document.getElementById('cad_age').value = '';
        document.getElementById('cad_func').value = '';
        // define local
        const idx = this._hash(pessoa.nome);
        // seleciona o primeiro item do local
        if (idx != null) {
            let node = this.local[idx];
            // se não tiver pessoa no local
            if (node == null) {
                // define o inicio do local como o pessoa
                this.local[idx] = pessoa;
                // this.localLen[idx]++;
                this.tamanho++;
                return;
            }

            // se não retornar é pq tem pelo menos um pessoa, então coloca ele na variavel "anterior".
            let anterior = node;
            // enquanto o pessoa existir:
            while (node != null) {
                anterior = node;
                node = node.proximo;
                // itera ate o fim da lista
            }

            // adiciona no fim
            anterior.proximo = pessoa;
            // this.localLen[idx]++;
            this.tamanho++;
        }
    }

    mostrar() {
        let retorno = []
        for (let idx = 0; idx < this.local.length; idx++) {
            let anterior = this.local[idx];
            let curr = anterior
            // enquanto a pessoa existir:
            while (curr != null) {
                anterior = curr;
                retorno.push([anterior.nome, anterior.idade, anterior.funcao])
                curr = curr.proximo;
            }
        }
        document.getElementById('lista-de-pessoas').innerHTML = `<input class="sub" type="button" value="Filtrar por ...">`
        for (let i = 0; i < retorno.length; i++){
            document.getElementById('lista-de-pessoas').innerHTML += `<li class="pessoa">
            <h2>Nome: <span id="name">${retorno[i][0]}</span></h2>
            <p>Idade: <span id="age">${retorno[i][1]}</span></p>
            <p>Cargo: <span id="func">${retorno[i][2]}</span></p>
        </li>`
        }
        console.log(retorno)
    }

    // Verificar se o cliente está cadastrado.
    pesquisar(nome) {
        const idx = this._hash(nome);
        // console.log(idx);
        let current = this.local[idx];
        if (current != null){
            while(current != null){
                if (current.nome == nome){
                    document.getElementById('sch_name').innerText = current.nome
                    document.getElementById('sch_age').innerText = current.idade
                    document.getElementById('sch_func').innerText = current.funcao
                    document.getElementById('rmv_but').disabled = false
                    return;
                }
                current = current.proximo
            }
        }
        alert('Usuário não cadastrado.')
    }

    // Remover cliente
    deletar(nome) {
        // Usa o método hash para acahar o índice que vai procurar.
        const idx = this._hash(nome);
        // Pega o primeiro nó da lista.
        let current = this.local[idx];
        let anterior = null;
        let encontrado = false;
        // Enquanto não encontrar continua iterando na lista encadeada.
        while (!encontrado) {
            // Quando acha o nome procurado não avança.
            if (current.nome == nome) {
                encontrado = true;
            } else {
                anterior = current;
                current = current.proximo;
            }
        }

        /* 
        Se não passar pelo while, apenas deleta o primeiro nó (no caso ta sobrescrevendo...),
        se não, sobrescreve o nó na posição que terminou a iteração.
        */
        if (anterior == null) {
            this.local[idx] = current.proximo;
        } else {
            anterior.proximo = current.proximo;
        }
        document.getElementById('sch_name').innerText = ''
        document.getElementById('sch_age').innerText = ''
        document.getElementById('sch_func').innerText = ''
        document.getElementById('rmv_but').disabled = true
        document.getElementById('sch_name_busca').value = ''
        alert(`O cadastro de ${current.nome} foi deletado`)
    }
}

// Fim da estrutura hash table

var tabela = new HashTable();

function voltar() {
    for (let i = 0; i < lista_sections.length; i++) {
        if (!lista_sections[i].classList.contains('hide')) {
            lista_sections[i].classList.add('hide');
            canBack = false;
        }
    }
    main_menu.classList.remove('hide')
    botao.classList.add('hide')
}

function nav(index) {
    lista_sections[index].classList.remove('hide')
    main_menu.classList.add('hide')
    botao.classList.remove('hide')
}

function testar() {
    tabela.cadastrar(new Node('jockson', 21, 'Programador'))
    tabela.cadastrar(new Node('Lucas', 20, 'Maníaco do Java'))
    tabela.cadastrar(new Node('João Carlos', 19, 'Vendedor de Curso'))
    tabela.mostrar()
    tabela
}