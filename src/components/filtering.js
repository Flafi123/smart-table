import {createComparison, defaultRules} from "../lib/compare.js";

// Создаем компаратор один раз при загрузке модуля
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // Заполняем выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => `<option value="${name}">${name}</option>`)
        )
    });
    
    return (data, state, action) => {
        // Обрабатываем действие очистки
        if (action && action.name === 'clear') { 
            // Исправляем опечатку и убираем цифру 1
            const input = action.parentNode.querySelector('input');
            input.value = '';
        }
        // Убираем дублирование - используем компаратор созданный выше
        return data.filter(row => compare(row, state)); 
    }
}