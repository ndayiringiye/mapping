
        // Create animated stars background
        function createStars() {
            const starsContainer = document.querySelector('.stars');
            const numStars = 100;
            
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        const countries = [
            'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Peru', 'Colombia',
            'Russia', 'Germany', 'France', 'United Kingdom', 'Spain', 'Italy', 'Poland', 'Ukraine', 'Turkey',
            'Egypt', 'Libya', 'Nigeria', 'South Africa', 'Kenya', 'Ethiopia', 'Morocco', 'Rwanda',
            'China', 'India', 'Japan', 'South Korea', 'Indonesia', 'Thailand', 'Vietnam', 'Iran', 'Saudi Arabia',
            'Australia', 'New Zealand'
        ];

        const searchInput = document.getElementById('countrySearch');
        const suggestions = document.getElementById('suggestions');
        const countryInfo = document.getElementById('countryInfo');
        const countryName = document.getElementById('countryName');
        const countryPaths = document.querySelectorAll('.country');

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length === 0) {
                suggestions.style.display = 'none';
                return;
            }

            const filtered = countries.filter(country => 
                country.toLowerCase().includes(query)
            );

            if (filtered.length > 0) {
                suggestions.innerHTML = filtered.map(country => 
                    `<div class="suggestion-item" onclick="selectCountry('${country}')">${country}</div>`
                ).join('');
                suggestions.style.display = 'block';
            } else {
                suggestions.style.display = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-wrapper')) {
                suggestions.style.display = 'none';
            }
        });

        function selectCountry(countryName) {
            searchInput.value = countryName;
            suggestions.style.display = 'none';
            highlightCountry(countryName);
        }

        function highlightCountry(name) {
            countryPaths.forEach(path => {
                path.classList.remove('highlighted');
            });

            const countryPath = document.querySelector(`[data-country="${name}"]`);
            if (countryPath) {
                countryPath.classList.add('highlighted');
                showCountryInfo(name);
            }
        }

        function showCountryInfo(name) {
            countryName.textContent = name;
            countryInfo.style.display = 'block';
        }

        function clearSelection() {
            countryPaths.forEach(path => {
                path.classList.remove('highlighted');
            });
            countryInfo.style.display = 'none';
            searchInput.value = '';
        }

        countryPaths.forEach(path => {
            path.addEventListener('click', function() {
                const name = this.getAttribute('data-country');
                selectCountry(name);
            });
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                const match = countries.find(country => 
                    country.toLowerCase() === query.toLowerCase() ||
                    country.toLowerCase().includes(query.toLowerCase())
                );
                
                if (match) {
                    selectCountry(match);
                }
            }
        });

        createStars();