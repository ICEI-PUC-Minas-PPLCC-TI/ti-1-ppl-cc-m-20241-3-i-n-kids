const apiUrl = 'https://iandn-kids-server.vercel.app/users';

function findAllUsers(processData) {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            processData(data.Users);
        })
        .catch((error) => {
            console.error(
                'Erro ao encontrar usuários cadastrados na API:',
                error
            );
            displayMessage('Erro ao encontrar usuários cadastrados', 'danger');
        });
}

function findUserById(userId, processData) {
    fetch(`${apiUrl}/search/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            processData(data.User);
        })
        .catch((error) => {
            console.error(
                'Erro ao encontrar usuário cadastrado na API:',
                error
            );
            displayMessage('Erro ao encontrar usuário', 'danger');
        });
}

function createUser(user, updateFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            displayMessage('Usuário cadastrado com sucesso', 'success');
            if (updateFunction) {
                updateFunction();
            }
        })
        .catch((error) => {
            console.error('Erro ao cadastrar usuário na API:', error);
            displayMessage('Erro ao cadastrar usuário', 'danger');
        });
}

function updateUser(id, user, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            if (updateFunction) {
                updateFunction();
            }
        })
        .catch((error) => {
            console.error('Erro ao alterar dados do usuário da API:', error);
            displayMessage('Erro ao alterar dados do usuário', 'danger');
        });
}

function deleteUser(id, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            displayMessage('Conta excluída com sucesso', 'success');
            if (updateFunction) {
                updateFunction();
            }
        })
        .catch((error) => {
            console.error('Erro ao excluir conta da API:', error);
            displayMessage('Erro ao remover conta', 'danger');
        });
}
