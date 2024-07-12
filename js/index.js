document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    
    function fetchUsers(username) {
      fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items); 
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  
    
    function displayUsers(users) {
      userList.innerHTML = ''; 
      reposList.innerHTML = ''; 
      users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `
          <div>
            <img src="${user.avatar_url}" alt="${user.login}" />
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          </div>
        `;
        userElement.addEventListener('click', () => fetchRepos(user.login)); 
        userList.appendChild(userElement);
      });
    }
  
    
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          displayRepos(data); 
        })
        .catch(error => console.error('Error fetching repositories:', error));
    }
  
    
    function displayRepos(repos) {
      reposList.innerHTML = ''; 
      repos.forEach(repo => {
        const repoElement = document.createElement('li');
        repoElement.innerHTML = `
          <div>
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : 'No description'}</p>
            <a href="${repo.html_url}" target="_blank">Visit repo</a>
          </div>
        `;
        reposList.appendChild(repoElement);
      });
    }
  
    
    githubForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        fetchUsers(searchTerm);
        searchInput.value = ''; 
      }
    });
  });
  