            //criação de uma matriz vazia chamada 'matriz_agenda' que irá guardar os nosso contatos, todas as funções serão realizadas nela.
            let matriz_agenda = [];
            
            //criação de uma função chamada 'funcaovalidar' para exibir uma mensagem de erro cas o usuário digite valores nulos com o botão 'cancelar' no ou digite strings vazias apenas apertando o botão 'ok' browser.
            function funcaovalidar(nome_contato, numero_contato, email_contato){
                if(nome_contato == null || numero_contato == null || email_contato == null || nome_contato == '' || numero_contato == '' || email_contato == '')
                    // caso as condições do if acima sejão atendidas a função retorna interpretando que nenhum dos campos acima foram preenchidos com valores nulos ou strings vazias.
                    return false;
                else{
                    return true
                };
            }

            /*
            * criação de uma função chamada 'funcaosalvar' que salva as modificações que o usuário faz na matriz 'matriz_agenda' que irá guardar os contatos do usuário;
            * cria uma variavel chamada 'agenda salvar' que irá guardar os dados presentes na matriz 'matriz_agenda' na forma de texto e após isso armazena a variavel 'agenda_salvar' em localStorage que guarda os dados na memoria do navegador com o nome 'agenda_contatos'.
            */
            function funcaosalvar(){
                const agenda_salvar = JSON.stringify(matriz_agenda);
                localStorage.setItem('agenda_contatos', agenda_salvar);
            }

            /*
            * criação de uma função que carrega os dados em texto armazenados no localStorage na variavel 'agenda_salvar' com o nome 'agenda_contatos';
            * cria uma variavel chamada 'agenda_carregar' que pega os itens contidos em localStorage com o nome 'agenda_contatos', se a 'agenda_carregar' não possuir valores nulos ela devolve os dados em forma de arrays para a matriz 'matriz_agenda';
            * caso não contenha valores na variavel (agenda_carregar === null) ela exibi a mensagem de que a agenda não possui contatos.
            */
            function funcaoagendacarregar(){
                const agenda_carregar = localStorage.getItem('agenda_contatos');
                if(agenda_carregar){
                    matriz_agenda = JSON.parse(agenda_carregar);
                    console.log("Agenda carregada com sucesso!");
                }
                else{
                    console.log("Sua agenda não possui contatos");
                }
            }
            
            /*
            * criação de uma função chamada 'funcaoadcionar' que adiciona os dados dos contatos como nome, numero de telefone e email através da criaçãp de 3 variaveis que irão guardar esses 3 dados
            * a função 'funcaovalidar' é chamada para verificar se nenhum dos dados preenchidos pelos usuário se considera nulo oucontem uma string vazia;
            * a função adicionar chama um loop for para fazer a validação de duplicatas através da flag 'validador_adicionar' antes de adicionar os dados na matriz 'agenda_contatos';
            * caso a flag 'validador_adicionar' ser igual a false, interpreta-se que o loop of não encontrou nenhum dado repetido na matriz 'matriz_agenda' e adiciona normalmente o contato na matriz, caso contenha algum dado repetido ele exibi uma mensagem de erro. 
            */
            function funcaoadicionar(){
                let nome_contato = prompt("Digite o nome do contato: ");
                let numero_contato = prompt("Digite o numero do contato: ");
                let email_contato = prompt("Digite o email do contato: ");
            
                if(funcaovalidar(nome_contato, numero_contato, email_contato) == true){

                    const regexNome = /^[a-zA-Z\s]+$/;
                    const regexNumero = /^[0-9]+$/;
                    
                    if (!regexNome.test(nome_contato)) {
                        alert("O nome do contato deve ter apenas letras!");
                        return;
                    }
                    if (!regexNumero.test(numero_contato)) {
                        alert("O numero de telefone do contato deve ter apenas números!");
                        return;
                    }

                    let validador_adicionar = false;
                    for(let i = 0; i < matriz_agenda.length; i++ ){
                        if (nome_contato.toLowerCase() === matriz_agenda[i][0].toLowerCase() || numero_contato.toLowerCase() === matriz_agenda[i][1].toLowerCase() || email_contato.toLowerCase() === matriz_agenda[i][2].toLowerCase()) {
                            alert(`Voce ja tem um contato como esse na sua agenda`);
                            validador_adicionar = true;
                            break; 
                        }
                    }
                    if(!validador_adicionar){
                        let contato = [nome_contato, numero_contato, email_contato];
                        matriz_agenda.push(contato);
                        alert("Contato adicionado");
                        funcaosalvar();
                    }
                } else {
                    alert("Por favor preencha todos os campos corretamente!");
                }
            }


            /*
            * criação de uma função chamada 'funcaovisualizar' que irá exibir a matriz 'matriz_agenda' no console do usuário com os contatos dele;
            * caso o tamanho (.length) for igual a 0 significa que a matriz 'matriz_agenda' ainda não possui nenhum array exibindo a mensagem de que a agenda não possui contatos;
            * caso a agenda possui pelo menos 1 contato a agenda é imprimida no console do usuário.
            */
            function funcaovisualizar(){
                if(matriz_agenda.length === 0){
                    alert("Sua agenda não possui contatos");
                } else {
                    alert("Sua agenda foi imprimida no console :)");
                    console.log(matriz_agenda);
                }
            }
            /*
            * criação de uma função 'funcaobuscar' que primeiro pede ao usuário oque ele deseja buscar através da variavel 'busca', caso a resposta for nula ou uma string vazia o programa exibirá uma mensagem de erro;
            * a função cria uma flag chamada validador para verificar e buscar o contato que o usuário quer buscar através da variavel 'busca' utilizando de um loop for que faz uma varredura pela matriz;
            * caso a busca encontre algum dado igual na matriz o programa exibe a mensagem de que o contato foi encontrado e logo depois exibe no alert as informações de nome, telefone e email;
            */
            function funcaobuscar() {
                let busca = prompt("Qual nome, telefone o email do contato que voce deseja buscar em sua lista?");
                if (busca === null || busca.trim() === '') {
                    alert("Por favor, preencha o campo corretamente!");
                    return;
                }

                let validador = false;

                for (let i = 0; i < matriz_agenda.length; i++) {
                    if (busca.toLowerCase() === matriz_agenda[i][0].toLowerCase() || busca.toLowerCase() === matriz_agenda[i][1].toLowerCase() || busca.toLowerCase() === matriz_agenda[i][2].toLowerCase()) {
                        alert("Contato encontrado");
                        alert(`nome: ${matriz_agenda[i][0]}\nnumero: ${matriz_agenda[i][1]}\nemail contato: ${matriz_agenda[i][2]}`);
                        validador = true;
                        break;
                    }
                }
                if (!validador) {
                    alert("Contato não encontrado");
                }
            }
            /*
            * criação de uma função 'funcaoexcluir' que primeiro pergunta ao usuário qual o nome, telefone ou email que o usuário deseja excluir através da criação de uma variavel chamada de 'excluir_contato', caso a resposta for nula ou uma string vazia o programa exibirá uma mensagem de erro;
            * a função cria uma flag chamada validador para verificar e buscar o contato que o usuário quer buscar através da variavel 'excluir_contato' utilizando de um loop for que faz uma varredura pela matriz;
            * caso a busca encontre algum dado igual na matriz o programa exibe a mensagem de que o contato foi encontrado e logo depois exibe no alert as informações de nome, telefone e email. O programa exige que o usuário digite na caixa de texto 'excluir contato' para confirmar se o usuário realmente deseja excluir o contato encontrado;
            * caso ele digite o contato encontrado é excluido da matriz 'matriz_agenda', caso ele não digite é exibido uma mensagem de erro falando que a operação foi cancelada
            */
            function funcaoexcluir(){
                let excluir_contato = prompt("Digite o nome, telefone ou email do contato que voce deseja excluir: ");
                if (excluir_contato === null || excluir_contato === ''){ 
                    alert("Por favor, preencha os campos corretamente!");
                    return;
                }

                let validador = false;

                for (let i = 0; i < matriz_agenda.length; i++) {
                    if (excluir_contato.toLowerCase() === matriz_agenda[i][0].toLowerCase() || excluir_contato.toLowerCase() === matriz_agenda[i][1].toLowerCase() || excluir_contato.toLowerCase() === matriz_agenda[i][2].toLowerCase()) {
                        let confirmar_excluir = prompt(`Contato encontrado:\n\nNome: ${matriz_agenda[i][0]}\nNúmero: ${matriz_agenda[i][1]}\nEmail: ${matriz_agenda[i][2]}\n\n(Digite 'excluir contato' para excluir o contato)`);
                        
                        if (confirmar_excluir && confirmar_excluir.toLowerCase() === 'excluir contato') {
                            matriz_agenda.splice(i, 1);
                            alert("contato excluído com sucesso!");
                            validador = true;
                            funcaosalvar();
                            break;
                        } else {
                            alert("Operação cancelada, você não excluiu o contato");
                            validador = true;
                            break;
                        }
                    }
                }
                if (!validador) {
                    alert("contato não encontrado");
                }
            }
            
            /*
            * criação de uma função chamada 'funcaoatualizar' que primeiro pede ao usuário digitar o nome, telefone ou email para procurar o contato através de um loop for, caso a resposta for nula ou uma string vazia o programa exibirá uma mensagem de erro;
            * caso o contato for encontrado ele exibe o contato com seu nome, telefone e email exige que o usuário digite 'atualizar' na caixa de texto para confirmar que ele realmente queira atualizar;
            * após isso ele pede para o usuário digitar um número que corresponde com qual campo ele quer atualizar 1 para nome, 2 para telefone, 3 para email;
            * após escolher o campo que o usuário quer atualizar o programa pede para o usuário digitar o novo dado que substitui o antigo dado e após isso exibe uma mensagem confirmando que o dado foi alterado.
            */
            function funcaoatualizar(){
                let atualizar_contato = prompt("Digite o nome, telefone ou email do contato que você deseja atualizar");
                if (atualizar_contato === null || atualizar_contato.trim() === '') {
                    alert("Operação cancelada.");
                    return;
                }
                
                let contato_encontrado = false;
                
                for(let i = 0; i < matriz_agenda.length; i++){
                    if (atualizar_contato.toLowerCase() === matriz_agenda[i][0].toLowerCase() || atualizar_contato.toLowerCase() === matriz_agenda[i][1].toLowerCase() || atualizar_contato.toLowerCase() === matriz_agenda[i][2].toLowerCase()){
                        
                        let confirmar_atualizar = prompt(`Usuário encontrado:\n\nNome: ${matriz_agenda[i][0]}\nNúmero: ${matriz_agenda[i][1]}\nEmail: ${matriz_agenda[i][2]}\n\n(Digite 'atualizar' para continuar)`);
                        
                        if (confirmar_atualizar && confirmar_atualizar.toLowerCase() === 'atualizar') {
                            let opcao_atualizar = prompt("Digite 1 para atualizar o nome do contato, digite 2 para atualizar o telefone do contato, digite 3 para atualizar o email do contato");
                            opcao_atualizar = parseInt(opcao_atualizar);
                            
                            switch (opcao_atualizar) {
                                case 1:
                                    let novo_nome = prompt("Digite o novo nome:");
                                    if(novo_nome){
                                        const regexNome = /^[a-zA-Z\s]+$/;
                                        if (!regexNome.test(novo_nome)) {
                                            alert("Erro: O nome deve conter apenas letras.");
                                            break;
                                        }
                                    else{    matriz_agenda[i][0] = novo_nome;
                                        alert("Nome atualizado com sucesso!");
                                    }
                                    }
                                    break;
                                case 2:
                                    let novo_telefone = prompt("Digite o novo telefone:");
                                    if(novo_telefone){
                                        const regexNumero = /^[0-9]+$/;
                                        if (!regexNumero.test(novo_telefone)) {
                                            alert("Erro: O telefone deve conter apenas números.");
                                            break;
                                        }
                                        else{matriz_agenda[i][1] = novo_telefone;
                                        alert("Telefone atualizado com sucesso!");
                                        }
                                    }
                                    break;
                                case 3: 
                                    let novo_email = prompt("Digite o novo email:");
                                    if(novo_email){
                                        matriz_agenda[i][2] = novo_email;
                                        alert("Email atualizado com sucesso!");
                                    }
                                    break;
                                default:
                                    alert("Por favor digite uma opção valida");
                            }
                            funcaosalvar();
                            contato_encontrado = true;
                            break;
                        } else {
                            alert("Operação cancelada, você não confirmou que queria atualizar!");
                            contato_encontrado = true;
                            break;
                        }
                    }
                }
                if(!contato_encontrado){
                    alert("Contato não encontrado.");
                }
            }
            
            function funcaoopcao(){
                let opcao = '';
                funcaoagendacarregar();

                do {
                    opcao = prompt("Digite 1 para adicionar um contato\n2 para visualizar\n3 para buscar\n4 para excluir\n5 para atualizar\n6 para sair");
                    if (opcao === null) {
                        break;
                    }
                    opcao = parseInt(opcao);

                    switch(opcao){
                        case 1:
                            funcaoadicionar();
                            break;
                        case 2:
                            funcaovisualizar();
                            break;
                        case 3:
                            funcaobuscar();
                            break;
                        case 4:
                            funcaoexcluir();
                            break;
                        case 5:
                            funcaoatualizar();
                            break;
                        case 6:
                            alert("obrigado por usar");
                            break;
                        default:
                            alert("Opção inválida. Tente novamente.");
                    }
                } while (opcao !== 6);
            }
