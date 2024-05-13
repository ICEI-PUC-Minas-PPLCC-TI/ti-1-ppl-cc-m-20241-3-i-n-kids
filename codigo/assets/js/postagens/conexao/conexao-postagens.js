const apiUrl = 'SEU_LINK';

function createPost(post, updateFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Postagem criada com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao criar postagem via JSON Server:', error);
            displayMessage('Erro ao criar postagem', 'danger');
        });
}

function readPost(processData) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processData(data);
        })
        .catch(error => {
            console.error('Erro ao ler postagens via JSON Server:', error);
            displayMessage('Erro ao ler postagens', 'danger');
        });
}

function updatePost(id, post, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Postagem alterada com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar postagem via JSON Server:', error);
            displayMessage('Erro ao atualizar postagem', 'danger');
        });
}

function deletePost(id, updateFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage('Postagem removida com sucesso', 'success');

            if (updateFunction) {
                updateFunction();
            }
        })
        .catch(error => {
            console.error('Erro ao remover postagem via JSON Server:', error);
            displayMessage('Erro ao remover postagem', 'danger');
        });
}