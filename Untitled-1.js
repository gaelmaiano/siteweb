<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BountyAcademy - Apprenez le Bug Bounty</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600;800&display=swap');

        :root {
            --bg-dark: #0f172a;
            --accent: #10b981; /* Emerald 500 */
            --accent-hover: #059669;
            --text-main: #e2e8f0;
            --terminal-bg: #1e293b;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
        }

        .mono {
            font-family: 'JetBrains Mono', monospace;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }

        /* Animations */
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .glass-panel {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Toast Notification */
        #toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 50;
        }
        .toast {
            background: #1e293b;
            border-left: 4px solid var(--accent);
            color: white;
            padding: 15px 20px;
            margin-top: 10px;
            border-radius: 4px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        }
        .toast.show {
            transform: translateX(0);
        }

        /* Code Syntax Highlighting Simulation */
        .code-block {
            background: #000;
            border-radius: 6px;
            padding: 1rem;
            border: 1px solid #334155;
            overflow-x: auto;
        }
        .kw { color: #c678dd; } /* Keyword */
        .str { color: #98c379; } /* String */
        .fn { color: #61afef; } /* Function */
        .com { color: #5c6370; font-style: italic; } /* Comment */
    </style>
</head>
<body class="h-screen flex flex-col md:flex-row overflow-hidden">

    <!-- Sidebar Navigation -->
    <nav class="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20">
        <div class="p-6 flex items-center gap-3 border-b border-slate-800">
            <i class="fa-solid fa-bug text-emerald-500 text-2xl"></i>
            <h1 class="text-xl font-bold tracking-wider text-white">Bounty<span class="text-emerald-500">Acad</span></h1>
        </div>

        <!-- User Stats -->
        <div class="p-4 bg-slate-800/50 m-4 rounded-lg border border-slate-700">
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs text-slate-400 uppercase font-bold">Rang Actuel</span>
                <span id="user-level" class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Novice</span>
            </div>
            <div class="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div id="xp-bar" class="bg-emerald-500 h-full transition-all duration-500" style="width: 0%"></div>
            </div>
            <div class="flex justify-between mt-1 text-xs text-slate-400">
                <span id="current-xp">0 XP</span>
                <span id="next-level-xp">1000 XP</span>
            </div>
        </div>

        <!-- Menu Items -->
        <div class="flex-1 overflow-y-auto py-2">
            <button onclick="app.navigate('dashboard')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3 active-nav">
                <i class="fa-solid fa-chart-line w-5"></i> Tableau de bord
            </button>
            
            <div class="px-6 py-2 mt-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Modules</div>
            
            <button onclick="app.navigate('module-intro')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-book-open w-5"></i> Introduction
            </button>
            <button onclick="app.navigate('module-xss')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-code w-5"></i> XSS (Cross-Site Scripting)
            </button>
            <button onclick="app.navigate('module-idor')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-id-card w-5"></i> IDOR
            </button>
             <button onclick="app.navigate('module-sqli')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-database w-5"></i> SQL Injection
            </button>

            <div class="px-6 py-2 mt-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pratique</div>
            
            <button onclick="app.navigate('lab-xss')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-flask w-5"></i> Laboratoire XSS
            </button>
            <button onclick="app.navigate('lab-idor')" class="nav-btn w-full text-left px-6 py-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border-l-4 border-transparent hover:border-emerald-500 flex items-center gap-3">
                <i class="fa-solid fa-server w-5"></i> Laboratoire IDOR
            </button>
        </div>

        <div class="p-4 text-center text-xs text-slate-600 border-t border-slate-800">
            v1.0.0 | Mode Simulation
        </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto bg-slate-900 relative">
        <!-- Top Bar (Mobile Toggle) -->
        <div class="md:hidden p-4 bg-slate-800 flex justify-between items-center">
            <span class="font-bold text-white">BountyAcademy</span>
            <button class="text-white" onclick="toggleMobileMenu()"><i class="fa-solid fa-bars"></i></button>
        </div>

        <div id="content-area" class="p-4 md:p-8 max-w-5xl mx-auto min-h-full pb-20">
            <!-- Content injected via JS -->
        </div>
    </main>

    <!-- Toast Container -->
    <div id="toast-container"></div>

    <script>
        /* * BOUNTY ACADEMY APP LOGIC
         */

        const appState = {
            xp: 0,
            level: 1,
            completedModules: [],
            currentView: 'dashboard'
        };

        // --- Data Content ---

        const modules = {
            'module-intro': {
                title: "Introduction au Bug Bounty",
                icon: "fa-book-open",
                content: `
                    <div class="space-y-6 fade-in">
                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-2xl font-bold text-white mb-4">Qu'est-ce que le Bug Bounty ?</h2>
                            <p class="text-slate-300 mb-4">
                                Le Bug Bounty est un programme offert par de nombreux sites web et développeurs de logiciels qui permet aux individus de recevoir reconnaissance et compensation financière pour avoir rapporté des bugs, en particulier ceux liés à la sécurité et aux vulnérabilités.
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div class="bg-slate-900 p-4 rounded border border-slate-700">
                                    <h3 class="text-emerald-400 font-bold mb-2"><i class="fa-solid fa-user-shield mr-2"></i>White Hat</h3>
                                    <p class="text-sm text-slate-400">Hackers éthiques qui utilisent leurs compétences pour améliorer la sécurité. Ils demandent la permission et rapportent les failles.</p>
                                </div>
                                <div class="bg-slate-900 p-4 rounded border border-slate-700">
                                    <h3 class="text-red-400 font-bold mb-2"><i class="fa-solid fa-user-ninja mr-2"></i>Black Hat</h3>
                                    <p class="text-sm text-slate-400">Hackers malveillants qui exploitent les failles pour un gain personnel ou pour nuire, sans autorisation.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-xl font-bold text-white mb-4">Les plateformes principales</h2>
                            <ul class="list-disc list-inside text-slate-300 space-y-2">
                                <li><strong class="text-white">HackerOne</strong> : La plus grosse plateforme mondiale.</li>
                                <li><strong class="text-white">Bugcrowd</strong> : Très populaire avec beaucoup de programmes privés.</li>
                                <li><strong class="text-white">Intigriti</strong> : Plateforme européenne en pleine croissance.</li>
                                <li><strong class="text-white">YesWeHack</strong> : Leader européen, excellent pour débuter.</li>
                            </ul>
                        </div>

                        <button onclick="app.completeModule('module-intro', 100)" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
                            <i class="fa-solid fa-check mr-2"></i> Marquer comme terminé (+100 XP)
                        </button>
                    </div>
                `
            },
            'module-xss': {
                title: "Cross-Site Scripting (XSS)",
                icon: "fa-code",
                content: `
                    <div class="space-y-6 fade-in">
                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-2xl font-bold text-white mb-4">Comprendre la faille XSS</h2>
                            <p class="text-slate-300 mb-4">
                                Le Cross-Site Scripting (XSS) permet à un attaquant d'injecter du code JavaScript malveillant dans une page web consultée par d'autres utilisateurs.
                            </p>
                            
                            <div class="mt-4">
                                <h3 class="text-lg font-bold text-emerald-400 mb-2">Types de XSS</h3>
                                <div class="space-y-3">
                                    <div class="p-3 bg-slate-900 border-l-4 border-blue-500 rounded">
                                        <strong class="text-white block">Reflected XSS</strong>
                                        <span class="text-sm text-slate-400">Le script malveillant provient de la requête HTTP (ex: paramètre URL) et est renvoyé immédiatement par le serveur.</span>
                                    </div>
                                    <div class="p-3 bg-slate-900 border-l-4 border-purple-500 rounded">
                                        <strong class="text-white block">Stored XSS</strong>
                                        <span class="text-sm text-slate-400">Le script est stocké sur le serveur (ex: dans un commentaire) et servi à chaque visiteur. C'est le plus dangereux.</span>
                                    </div>
                                    <div class="p-3 bg-slate-900 border-l-4 border-orange-500 rounded">
                                        <strong class="text-white block">DOM XSS</strong>
                                        <span class="text-sm text-slate-400">La vulnérabilité est dans le code JavaScript côté client, modifiant le DOM de manière non sécurisée.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-xl font-bold text-white mb-4">Exemple de Payload</h2>
                            <p class="text-slate-300 mb-2">Le test le plus basique consiste à faire apparaître une fenêtre d'alerte :</p>
                            <div class="code-block mono text-sm">
                                <span class="kw">&lt;script&gt;</span><span class="fn">alert</span>(<span class="str">1</span>)<span class="kw">&lt;/script&gt;</span>
                            </div>
                            <p class="text-slate-300 mt-4 mb-2">Ou via une balise image (pour contourner certains filtres) :</p>
                            <div class="code-block mono text-sm">
                                <span class="kw">&lt;img</span> src=<span class="str">x</span> onerror=<span class="fn">alert</span>(<span class="str">1</span>)<span class="kw">&gt;</span>
                            </div>
                        </div>

                        <div class="bg-yellow-900/30 border border-yellow-600/50 p-4 rounded-lg flex gap-4 items-start">
                            <i class="fa-solid fa-triangle-exclamation text-yellow-500 mt-1"></i>
                            <div>
                                <h4 class="font-bold text-yellow-400">Impact</h4>
                                <p class="text-sm text-yellow-100/80">Vol de cookies de session, redirection vers des sites de phishing, actions au nom de l'utilisateur.</p>
                            </div>
                        </div>

                        <button onclick="app.navigate('lab-xss')" class="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors border border-slate-600 mb-2">
                            <i class="fa-solid fa-flask mr-2"></i> Aller au Laboratoire Pratique
                        </button>
                        
                        <button onclick="app.completeModule('module-xss', 150)" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
                            <i class="fa-solid fa-check mr-2"></i> Marquer comme terminé (+150 XP)
                        </button>
                    </div>
                `
            },
            'module-idor': {
                title: "Insecure Direct Object Ref (IDOR)",
                icon: "fa-id-card",
                content: `
                    <div class="space-y-6 fade-in">
                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-2xl font-bold text-white mb-4">Comprendre l'IDOR</h2>
                            <p class="text-slate-300 mb-4">
                                L'IDOR survient lorsqu'une application expose une référence à un objet interne (comme un ID dans une URL ou un formulaire) sans vérifier correctement les permissions de l'utilisateur.
                            </p>
                            <p class="text-slate-300">
                                En changeant simplement cet ID, un attaquant peut accéder aux données d'autres utilisateurs.
                            </p>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-xl font-bold text-white mb-4">Anatomie d'une attaque</h2>
                            <div class="space-y-4">
                                <div class="flex items-center gap-4">
                                    <div class="bg-red-500/20 text-red-400 p-3 rounded font-bold text-xl">1</div>
                                    <div>
                                        <p class="text-white font-bold">Observation</p>
                                        <p class="text-sm text-slate-400">L'URL ressemble à : <code class="bg-slate-900 px-2 py-1 rounded text-emerald-400">site.com/profil?user_id=1001</code></p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="bg-red-500/20 text-red-400 p-3 rounded font-bold text-xl">2</div>
                                    <div>
                                        <p class="text-white font-bold">Modification</p>
                                        <p class="text-sm text-slate-400">L'attaquant change 1001 en 1002.</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="bg-red-500/20 text-red-400 p-3 rounded font-bold text-xl">3</div>
                                    <div>
                                        <p class="text-white font-bold">Exploitation</p>
                                        <p class="text-sm text-slate-400">Le serveur renvoie les infos de l'utilisateur 1002 sans vérifier si vous êtes autorisé à les voir.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onclick="app.navigate('lab-idor')" class="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors border border-slate-600 mb-2">
                            <i class="fa-solid fa-flask mr-2"></i> Aller au Laboratoire Pratique
                        </button>
                        
                        <button onclick="app.completeModule('module-idor', 150)" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
                            <i class="fa-solid fa-check mr-2"></i> Marquer comme terminé (+150 XP)
                        </button>
                    </div>
                `
            },
             'module-sqli': {
                title: "SQL Injection (SQLi)",
                icon: "fa-database",
                content: `
                    <div class="space-y-6 fade-in">
                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-2xl font-bold text-white mb-4">Injection SQL</h2>
                            <p class="text-slate-300 mb-4">
                                Une injection SQL se produit lorsqu'une application insère des données utilisateur non sécurisées directement dans une requête de base de données. Cela permet à un attaquant de manipuler la requête.
                            </p>
                            <p class="text-slate-300">
                                Cela peut permettre de contourner l'authentification, d'accéder à des données sensibles, ou même de supprimer des données.
                            </p>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <h2 class="text-xl font-bold text-white mb-4">Exemple Classique</h2>
                            <p class="text-slate-400 text-sm mb-2">Requête PHP vulnérable :</p>
                            <div class="code-block mono text-sm mb-4">
                                $sql = <span class="str">"SELECT * FROM users WHERE user='"</span> . $username . <span class="str">"'"</span>;
                            </div>
                            
                            <p class="text-slate-400 text-sm mb-2">Payload d'attaquant :</p>
                            <div class="code-block mono text-sm mb-4">
                                admin' OR '1'='1
                            </div>

                            <p class="text-slate-400 text-sm mb-2">Résultat interprété :</p>
                            <div class="code-block mono text-sm">
                                SELECT * FROM users WHERE user='admin' OR '1'='1'
                            </div>
                            <p class="text-emerald-400 text-sm mt-2">La condition '1'='1' est toujours vraie, connectant l'attaquant sans mot de passe.</p>
                        </div>
                        
                        <button onclick="app.completeModule('module-sqli', 150)" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
                            <i class="fa-solid fa-check mr-2"></i> Marquer comme terminé (+150 XP)
                        </button>
                    </div>
                `
            }
        };

        // --- Application Logic ---

        const app = {
            init: function() {
                this.loadState();
                this.updateUI();
                this.renderDashboard();
            },

            loadState: function() {
                const saved = localStorage.getItem('bountyAcademyState');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    appState.xp = parsed.xp;
                    appState.level = parsed.level;
                    appState.completedModules = parsed.completedModules || [];
                }
            },

            saveState: function() {
                localStorage.setItem('bountyAcademyState', JSON.stringify(appState));
            },

            updateUI: function() {
                // Update sidebar active states
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.classList.remove('border-emerald-500', 'text-emerald-400', 'bg-slate-800');
                    btn.classList.add('text-slate-400', 'border-transparent');
                    if (btn.getAttribute('onclick').includes(appState.currentView)) {
                        btn.classList.add('border-emerald-500', 'text-emerald-400', 'bg-slate-800');
                        btn.classList.remove('text-slate-400', 'border-transparent');
                    }
                });

                // XP Bar
                const nextLevel = appState.level * 1000;
                const percentage = (appState.xp / nextLevel) * 100;
                document.getElementById('xp-bar').style.width = `${Math.min(percentage, 100)}%`;
                document.getElementById('current-xp').innerText = `${appState.xp} XP`;
                document.getElementById('next-level-xp').innerText = `${nextLevel} XP`;

                // Rank
                const ranks = ["Script Kiddie", "Novice", "Hunter", "Pro Hunter", "Elite"];
                const rankIndex = Math.min(Math.floor(appState.level / 2), ranks.length - 1);
                document.getElementById('user-level').innerText = `${ranks[rankIndex]} (Lvl ${appState.level})`;
            },

            navigate: function(view) {
                appState.currentView = view;
                this.updateUI();
                
                const contentArea = document.getElementById('content-area');
                
                if (view === 'dashboard') {
                    this.renderDashboard();
                } else if (modules[view]) {
                    this.renderModule(view);
                } else if (view === 'lab-xss') {
                    this.renderLabXSS();
                } else if (view === 'lab-idor') {
                    this.renderLabIDOR();
                }
            },

            renderDashboard: function() {
                const completedCount = appState.completedModules.length;
                const totalModules = Object.keys(modules).length;
                const progress = Math.round((completedCount / totalModules) * 100);

                const html = `
                    <div class="fade-in">
                        <h2 class="text-3xl font-bold text-white mb-6">Tableau de bord</h2>
                        
                        <!-- Hero Stats -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="glass-panel p-6 rounded-lg">
                                <div class="text-slate-400 text-sm mb-1">Progression Globale</div>
                                <div class="text-3xl font-bold text-white mb-2">${progress}%</div>
                                <div class="w-full bg-slate-700 h-1.5 rounded-full">
                                    <div class="bg-emerald-500 h-full rounded-full" style="width: ${progress}%"></div>
                                </div>
                            </div>
                            <div class="glass-panel p-6 rounded-lg">
                                <div class="text-slate-400 text-sm mb-1">Modules Terminés</div>
                                <div class="text-3xl font-bold text-white">${completedCount} <span class="text-slate-500 text-lg">/ ${totalModules}</span></div>
                            </div>
                            <div class="glass-panel p-6 rounded-lg">
                                <div class="text-slate-400 text-sm mb-1">Total XP</div>
                                <div class="text-3xl font-bold text-emerald-400">${appState.xp}</div>
                            </div>
                        </div>

                        <h3 class="text-xl font-bold text-white mb-4">Parcours d'apprentissage</h3>
                        <div class="grid grid-cols-1 gap-4">
                            ${Object.keys(modules).map(key => {
                                const m = modules[key];
                                const isDone = appState.completedModules.includes(key);
                                return `
                                    <div onclick="app.navigate('${key}')" class="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between group">
                                        <div class="flex items-center gap-4">
                                            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <i class="fa-solid ${m.icon}"></i>
                                            </div>
                                            <div>
                                                <h4 class="text-white font-bold group-hover:text-emerald-400 transition-colors">${m.title}</h4>
                                                <p class="text-xs text-slate-400">Module Théorique</p>
                                            </div>
                                        </div>
                                        ${isDone ? '<i class="fa-solid fa-circle-check text-emerald-500 text-xl"></i>' : '<i class="fa-solid fa-chevron-right text-slate-600"></i>'}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
                document.getElementById('content-area').innerHTML = html;
            },

            renderModule: function(key) {
                const m = modules[key];
                const html = `
                    <div class="max-w-3xl mx-auto">
                        <div class="flex items-center gap-3 mb-6 text-slate-400 hover:text-white cursor-pointer" onclick="app.navigate('dashboard')">
                            <i class="fa-solid fa-arrow-left"></i> Retour au tableau de bord
                        </div>
                        <h1 class="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <i class="fa-solid ${m.icon} text-emerald-500"></i> ${m.title}
                        </h1>
                        <hr class="border-slate-700 mb-8">
                        ${m.content}
                    </div>
                `;
                document.getElementById('content-area').innerHTML = html;
            },

            renderLabXSS: function() {
                const html = `
                    <div class="max-w-3xl mx-auto fade-in">
                        <h2 class="text-2xl font-bold text-white mb-2">Laboratoire de pratique : XSS</h2>
                        <p class="text-slate-400 mb-6">Objectif : Réussissez à faire apparaître une alerte JavaScript sur cette "page vulnérable". Essayez d'injecter : <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> ou <code>&lt;img src=x onerror=alert(1)&gt;</code></p>

                        <!-- Simulation Container -->
                        <div class="bg-white rounded-lg overflow-hidden border border-slate-600 shadow-2xl">
                            <!-- Fake Browser Bar -->
                            <div class="bg-gray-100 border-b px-4 py-2 flex items-center gap-2">
                                <div class="flex gap-1">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div class="flex-1 bg-white border rounded px-3 py-1 text-xs text-gray-500 font-mono text-center">
                                    http://vulnerable-site.com/search
                                </div>
                            </div>

                            <!-- Vulnerable Content -->
                            <div class="p-8 min-h-[300px] font-sans text-gray-800">
                                <h1 class="text-3xl mb-4">Recherche Produit</h1>
                                <div class="flex gap-2 mb-8">
                                    <input type="text" id="xss-input" placeholder="Rechercher..." class="border p-2 w-full rounded">
                                    <button onclick="app.runXSS()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Chercher</button>
                                </div>
                                <hr class="mb-4">
                                <div id="xss-result" class="p-4 bg-gray-50 rounded border border-dashed border-gray-300">
                                    Les résultats de votre recherche apparaîtront ici...
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 bg-slate-800 p-4 rounded border border-slate-700 text-sm text-slate-400">
                            <i class="fa-solid fa-info-circle text-blue-400 mr-2"></i>
                            Note : Dans ce simulateur, nous désactivons l'exécution réelle des scripts pour votre sécurité, mais nous détectons si votre payload est valide.
                        </div>
                    </div>
                `;
                document.getElementById('content-area').innerHTML = html;
            },

            runXSS: function() {
                const input = document.getElementById('xss-input').value;
                const resultArea = document.getElementById('xss-result');
                
                // Basic simulation of "Reflecting" the input without sanitization
                resultArea.innerText = `Résultats pour : ${input}`; // Safe way first to show text

                // Check for payloads
                const lowerInput = input.toLowerCase();
                // Fix: escape forward slash in script tag check to prevent HTML parser from closing script block early
                if (lowerInput.includes('<script>') && lowerInput.includes('<\/script>')) {
                    this.showToast("BINGO ! Faille XSS détectée (Script Tag)", "success");
                    this.completeModule('lab-xss', 200);
                    resultArea.innerHTML = `<span class="text-red-600 font-bold">SCRIPT EXECUTED!</span>`;
                } 
                else if (lowerInput.includes('onerror=') || lowerInput.includes('onload=')) {
                    this.showToast("BINGO ! Faille XSS détectée (Event Handler)", "success");
                    this.completeModule('lab-xss', 200);
                    resultArea.innerHTML = `<span class="text-red-600 font-bold">EVENT HANDLER EXECUTED!</span>`;
                }
                else if (input.includes('<') || input.includes('>')) {
                    resultArea.innerText = `Résultats pour : ${input}`;
                    this.showToast("Vous injectez du HTML, mais pas encore de script valide.", "warning");
                } else {
                     resultArea.innerText = `Résultats pour : ${input}`;
                }
            },

            renderLabIDOR: function() {
                // Default simulated ID
                if (!this.simId) this.simId = 1050;

                const html = `
                    <div class="max-w-3xl mx-auto fade-in">
                        <h2 class="text-2xl font-bold text-white mb-2">Laboratoire de pratique : IDOR</h2>
                        <p class="text-slate-400 mb-6">Objectif : Vous êtes l'utilisateur 1050. Essayez d'accéder au compte Administrateur (ID 1000) en manipulant l'URL.</p>

                        <!-- Simulation Container -->
                        <div class="bg-white rounded-lg overflow-hidden border border-slate-600 shadow-2xl">
                            <!-- Fake Browser Bar -->
                            <div class="bg-gray-100 border-b px-4 py-2 flex items-center gap-2">
                                <div class="flex gap-1">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div class="flex-1 bg-white border rounded px-3 py-1 text-xs text-gray-500 font-mono flex justify-between items-center">
                                    <span>http://shop.local/profile?user_id=<span id="url-id" class="text-blue-600 font-bold">${this.simId}</span></span>
                                    <i class="fa-solid fa-rotate-right cursor-pointer hover:text-blue-500"></i>
                                </div>
                            </div>

                            <!-- Vulnerable Content -->
                            <div class="p-8 min-h-[300px] font-sans text-gray-800 bg-gray-50">
                                <div class="flex gap-6">
                                    <!-- Controls -->
                                    <div class="w-1/3 border-r pr-4">
                                        <h3 class="font-bold mb-4 text-sm uppercase text-gray-500">Contrôles Attaquant</h3>
                                        <div class="space-y-2">
                                            <label class="text-xs block">Modifier l'ID dans l'URL :</label>
                                            <div class="flex gap-2">
                                                <input type="number" id="idor-input" value="${this.simId}" class="border p-1 w-full rounded text-sm">
                                                <button onclick="app.runIDOR()" class="bg-slate-800 text-white px-3 rounded text-sm hover:bg-slate-700">Go</button>
                                            </div>
                                            <div class="mt-4 text-xs text-gray-500">
                                                Indices:<br>
                                                Moi (User): 1050<br>
                                                Admin: 1000
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Profile View -->
                                    <div class="w-2/3 pl-2" id="profile-view">
                                        ${this.getProfileHTML(this.simId)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('content-area').innerHTML = html;
            },

            runIDOR: function() {
                const id = parseInt(document.getElementById('idor-input').value);
                this.simId = id;
                
                // Update Fake URL
                document.getElementById('url-id').innerText = id;

                // Update Content
                document.getElementById('profile-view').innerHTML = this.getProfileHTML(id);

                if (id === 1000) {
                    this.showToast("ACCÈS ADMIN RÉUSSI ! Faille IDOR exploitée.", "success");
                    this.completeModule('lab-idor', 250);
                }
            },

            getProfileHTML: function(id) {
                if (id === 1050) {
                    return `
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl"><i class="fa-solid fa-user"></i></div>
                            <div>
                                <h2 class="text-xl font-bold">Mon Profil</h2>
                                <p class="text-gray-500">ID: 1050 (Standard User)</p>
                            </div>
                        </div>
                        <div class="bg-white p-4 rounded shadow-sm border">
                            <p><strong>Nom:</strong> John Doe</p>
                            <p><strong>Email:</strong> john@example.com</p>
                            <p><strong>Carte Bancaire:</strong> **** **** **** 1234</p>
                        </div>
                    `;
                } else if (id === 1000) {
                    return `
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl"><i class="fa-solid fa-user-secret"></i></div>
                            <div>
                                <h2 class="text-xl font-bold text-red-600">ADMINISTRATEUR</h2>
                                <p class="text-gray-500">ID: 1000 (Root)</p>
                            </div>
                        </div>
                        <div class="bg-red-50 p-4 rounded shadow-sm border border-red-200">
                            <p class="text-red-800 font-bold mb-2"><i class="fa-solid fa-lock-open"></i> DONNÉES SENSIBLES EXPOSÉES</p>
                            <p><strong>Nom:</strong> Super Admin</p>
                            <p><strong>Email:</strong> admin@shop.local</p>
                            <p><strong>API KEY:</strong> af82-1234-bcde-9988</p>
                        </div>
                    `;
                } else {
                    return `
                        <div class="flex flex-col items-center justify-center h-full text-gray-400">
                            <i class="fa-solid fa-ban text-4xl mb-2"></i>
                            <p>Profil introuvable ou ID invalide</p>
                        </div>
                    `;
                }
            },

            completeModule: function(id, xpReward) {
                if (appState.completedModules.includes(id)) {
                    this.showToast("Module déjà terminé !", "info");
                    return;
                }

                appState.completedModules.push(id);
                this.addXP(xpReward);
                this.saveState();
                this.showToast(`Module terminé ! +${xpReward} XP`, "success");
                
                // Refresh view to show checkmark in dashboard later
                setTimeout(() => this.updateUI(), 500);
            },

            addXP: function(amount) {
                appState.xp += amount;
                // Check Level Up (every 1000 XP)
                const newLevel = Math.floor(appState.xp / 1000) + 1;
                if (newLevel > appState.level) {
                    appState.level = newLevel;
                    this.showToast(`NIVEAU SUPÉRIEUR ! Vous êtes niveau ${newLevel}`, "success");
                }
                this.updateUI();
            },

            showToast: function(message, type = 'info') {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                toast.className = 'toast';
                
                let icon = 'fa-info-circle';
                let color = 'var(--accent)';

                if (type === 'success') { icon = 'fa-check-circle'; color = '#10b981'; }
                if (type === 'warning') { icon = 'fa-exclamation-triangle'; color = '#f59e0b'; }
                if (type === 'error') { icon = 'fa-times-circle'; color = '#ef4444'; }

                toast.style.borderLeftColor = color;
                toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${color}"></i> <span>${message}</span>`;

                container.appendChild(toast);

                // Animate in
                requestAnimationFrame(() => {
                    toast.classList.add('show');
                });

                // Remove after 3s
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        container.removeChild(toast);
                    }, 300);
                }, 3000);
            }
        };

        // --- Mobile Menu Helper ---
        function toggleMobileMenu() {
            // Simple toggle logic for brevity in single file
            const nav = document.querySelector('nav');
            nav.classList.toggle('hidden'); 
            // Note: In a real complex app, we'd use a better overlay system
            // Here we assume desktop first, mobile tweaks via CSS classes if needed
            // but for this single file, sidebar is fixed. 
            // Let's make it just alert for now as a placeholder or scroll to top
        }

        // Init App
        window.addEventListener('DOMContentLoaded', () => {
            app.init();
        });

    </script>
</body>
</html>