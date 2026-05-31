function clean() {
    console.log('[i] Инициализация глубокой очистки хранилищ...');

    // 1. Очистка LocalStorage и SessionStorage
    try {
        localStorage.clear();
        sessionStorage.clear();
        console.log('[+] LocalStorage и SessionStorage успешно очищены.');
    } catch (e) { console.error('Ошибка очистки Web Storage:', e); }

    // 2. Очистка абсолютно всех Cookies
    try {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            // Удаляем куку для текущего домена, путей и поддоменов
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${location.hostname};`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname.split('.').slice(-2).join('.')};`;
        }
        console.log('[+] Все Cookies успешно удалены.');
    } catch (e) { console.error('Ошибка очистки Cookies:', e); }

    // 3. Удаление баз данных IndexedDB (именно там сторонние карты могут хранить тонны кэша)
    if (window.indexedDB && indexedDB.databases) {
        indexedDB.databases().then(dbs => {
            dbs.forEach(db => {
                indexedDB.deleteDatabase(db.name);
                console.log(`[+] База данных IndexedDB "${db.name}" удалена.`);
            });
        }).catch(e => console.error('Ошибка удаления IndexedDB:', e));
    };

};
