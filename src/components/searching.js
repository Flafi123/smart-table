import {rules, createComparison} from "../lib/compare.js";

export function initSearching(config) {
    const searchField = config.searchField || 'search';
    
    // Создаем правило поиска по нескольким полям
    const searchRule = rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false);
    
    // Правильно передаем правила в createComparison:
    // первый параметр - массив имен стандартных правил,
    // второй параметр - массив пользовательских правил
    const compare = createComparison(
        ['skipEmptyTargetValues'], // массив имен стандартных правил
        [searchRule] // массив пользовательских правил
    ); 

    return (data, state, action) => {
        const result = data.filter(row => compare(row, state));
        return result;
    };
}