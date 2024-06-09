let userId = localStorage.getItem('userId');
let modal = document.getElementById('modal');

if (!userId) {
    alert('Acesso restrito. Por favor, faça login para continuar.');
    window.location.replace('../usuario/login.html');
} else {
    modal.style.opacity = 1;

    var db = [];

    findAllTasks((data) => {
        db = data;
        listTarefas();
    });

    function listTarefas() {
        const tarefasPeloUserId = db.filter((task) => {
            return task.userId == userId;
        });

        const grupoHorastarefas = ordenaArrayTarefas(tarefasPeloUserId);

        let tableTarefas = document.getElementById('tableTarefas');

        grupoHorastarefas.map((tarefas) => {
            const linhatarefas = tableTarefas.insertRow();
            const horaCell = linhatarefas.insertCell();
            horaCell.className = 'infoRotina';
            horaCell.innerHTML = tarefas[0].time;

            for (let index = 0; index < 7; index++) {
                const tarefa = tarefas.find((t) => t.weekDay === index);

                const adicionarCell = linhatarefas.insertCell(index + 1);
                adicionarCell.className = 'tarefas';

                if (!tarefa) {
                    adicionarCell.innerHTML += ` <p></p>`;
                    continue;
                }

                adicionarCell.innerHTML += `
                    <p>${tarefa.title}</p>
               `;
            }
        });
    }

    function ordenaArrayTarefas(db) {
        const diasSemana = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sabado',
        ];

        const tarefasIndexDiaSemana = db.map((tarefa) => {
            return {
                _id: tarefa._id,
                title: tarefa.title,
                weekDay: diasSemana.indexOf(tarefa.weekDay),
                time: tarefa.time,
            };
        });

        const tarefasOrdenadas = tarefasIndexDiaSemana.sort(
            (anterior, posterior) => {
                const horanterior = new Date(`1970-01-01T${anterior.time}`);
                const horaposterior = new Date(`1970-01-01T${posterior.time}`);

                if (horanterior < horaposterior) {
                    return -1;
                } else if (horanterior > horaposterior) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );

        const gruposHoras = [];
        let grupoAtual = [];
        let horaAtual = null;

        for (const tarefa of tarefasOrdenadas) {
            if (horaAtual === null || tarefa.time === horaAtual) {
                grupoAtual.push(tarefa);
            } else {
                gruposHoras.push(grupoAtual);
                grupoAtual = [tarefa];
            }
            horaAtual = tarefa.time;
        }

        if (grupoAtual.length > 0) {
            gruposHoras.push(grupoAtual);
        }

        gruposHoras.forEach((grupo) => {
            grupo.sort((tarefa1, tarefa2) => {
                const diaSemana1 = tarefa1.weekDay;
                const diaSemana2 = tarefa2.weekDay;

                if (diaSemana1 < diaSemana2) {
                    return -1;
                } else if (diaSemana1 > diaSemana2) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });

        return gruposHoras;
    }
}
