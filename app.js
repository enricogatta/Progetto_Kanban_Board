const PlusIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const Trash2Icon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const ArrowRightIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

const { useState, useEffect } = React;

// Costanti Globali
const STORAGE_KEY = 'devtask_issues';

const PRIORITIES = {
    critical: { label: 'Critica', color: 'bg-red-100 text-red-800 border-red-300' },
    high: { label: 'Alta', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    medium: { label: 'Media', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    low: { label: 'Bassa', color: 'bg-green-100 text-green-800 border-green-300' },
};

const COLUMNS = [
    { id: 'backlog', title: 'Backlog', next: 'inProgress' },
    { id: 'inProgress', title: 'In Progress', next: 'review' },
    { id: 'review', title: 'Review', next: 'done' },
    { id: 'done', title: 'Done', next: null }
];

// Componente principale
function DevTaskManager() {
    const [issues, setIssues] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: '',
        priority: 'medium'
    });

    // Effect 1: Caricamento iniziale da localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setIssues(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Errore nel caricamento dei dati da localStorage:', e);
            setIssues([]); 
        }
    }, []);

    // Effect 2: Salvataggio su localStorage ad ogni modifica delle issues
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    }, [issues]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Funzione per creare una nuova issue
    const createIssue = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const newIssue = {
            id: Date.now().toString(),
            ...formData,
            status: 'backlog',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setIssues([...issues, newIssue]);
        setFormData({ title: '', description: '', assignee: '', priority: 'medium' });
        setShowForm(false);
    };

    // Conta le issue totali per colonna
    const getColumnCount = (columnId) => {
        return issues.filter(issue => issue.status === columnId).length;
    };

    // Funzione per spostare una issue alla colonna successiva
    const moveIssue = (issueId, currentStatus) => {
        const column = COLUMNS.find(col => col.id === currentStatus);
        if (!column || !column.next) return;

        setIssues(issues.map(issue =>
            issue.id === issueId
                ? { ...issue, status: column.next, updatedAt: new Date().toISOString() }
                : issue
        ));
    };

    // Funzione per eliminare una issue
    const deleteIssue = (issueId) => {
        setIssues(issues.filter(issue => issue.id !== issueId));
    };

    // Filtra e ordina le issue per colonna e termine di ricerca
    const getColumnIssues = (columnId) => {
        const priorityOrder = ['critical', 'high', 'medium', 'low'];

        const filtered = issues.filter(issue => {
            const matchesStatus = issue.status === columnId;
            const matchesSearch = searchTerm === '' ||
                issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.assignee.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });

        return filtered.sort((a, b) => {
            const priorityA = priorityOrder.indexOf(a.priority);
            const priorityB = priorityOrder.indexOf(b.priority);
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            return new Date(a.createdAt) - new Date(b.createdAt); 
        });
    };
    
     return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="bg-white rounded-xl shadow-xl p-6 mb-6 border-b-4 border-blue-600">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 md:mb-0">
                            DevTask Manager
                        </h1>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm bg-slate-50 p-3 rounded-xl border border-slate-200">
                            {COLUMNS.map(col => (
                                <span key={col.id} className="text-slate-600">
                                    <span className="font-bold text-slate-800">{col.title}:</span> 
                                    <span className="ml-1 font-semibold text-blue-600">{getColumnCount(col.id)}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all font-medium shadow-blue-500/50 shadow-md hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] min-w-[150px]"
                        >
                            <PlusIcon className="w-5 h-5" />
                            {showForm ? 'Nascondi Form' : 'Nuova Issue'}
                        </button>
                        
                        <div className="flex-1 relative w-full">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cerca per titolo, descrizione o assegnatario..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Form Nuova Issue */}
                    {showForm && (
                        <form onSubmit={createIssue} className="mt-6 p-6 bg-blue-50 rounded-xl border-4 border-blue-200 shadow-inner transition-opacity duration-300">
                            <h2 className="text-xl font-bold text-blue-800 mb-4">Dettagli Nuova Issue</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-blue-700 mb-1">
                                        Titolo *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleFormChange}
                                        placeholder="Inserisci un titolo conciso"
                                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-blue-700 mb-1">
                                        Descrizione
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        placeholder="Descrivi l'issue nel dettaglio"
                                        rows="3"
                                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-blue-700 mb-1">
                                        Assegnatario
                                    </label>
                                    <input
                                        type="text"
                                        name="assignee"
                                        value={formData.assignee}
                                        onChange={handleFormChange}
                                        placeholder="Nome assegnatario"
                                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-blue-700 mb-1">
                                        Priorità
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
                                    >
                                        {Object.keys(PRIORITIES).map(key => (
                                            <option key={key} value={key}>{PRIORITIES[key].label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                                >
                                    Crea Issue
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-5 py-2 rounded-xl transition-colors font-semibold shadow-md"
                                >
                                    Annulla
                                </button>
                            </div>
                        </form>
                    )}
                </header>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {COLUMNS.map(column => {
                        const columnIssues = getColumnIssues(column.id);
                        return (
                            <div key={column.id} className="bg-slate-100 rounded-xl shadow-lg p-4 flex flex-col h-[70vh] md:h-[calc(100vh-200px)]">
                                <div className="flex items-center justify-between mb-4 border-b pb-2 border-slate-300">
                                    <h2 className={`text-xl font-extrabold ${column.id === 'done' ? 'text-green-700' : 'text-slate-800'}`}>
                                        {column.title}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${column.id === 'done' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                                        {columnIssues.length}
                                    </span>
                                </div>

                                {/* Contenitore scorrevole per le card */}
                                <div className="space-y-4 overflow-y-auto pr-1 kanban-column flex-1">
                                    {columnIssues.length === 0 ? (
                                        <div className="text-center py-12 text-slate-400 text-base font-medium border-2 border-dashed border-slate-300 rounded-xl m-2 bg-slate-50">
                                            Nessuna issue trovata.
                                        </div>
                                    ) : (
                                        columnIssues.map(issue => (
                                            <KanbanCard 
                                                key={issue.id}
                                                issue={issue}
                                                column={column}
                                                moveIssue={moveIssue}
                                                deleteIssue={deleteIssue}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
// Monta l'applicazione React
// Assicurati che l'elemento 'root' esista in index.html
const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<DevTaskManager />);
} else {
    console.error("Errore: Impossibile trovare l'elemento 'root' per il rendering di React.");
}
