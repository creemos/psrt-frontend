const Greetings = () => {
  return (
    <div className="pl-10">
      <h2 className="font-bold text-2xl">Задание:</h2>
      <div>
        <p className="font-bold text-xl">Необходимо написать WEB приложение по учету классов в школе. </p>
        <p>Необходимые объекты учета:</p>
        <ul>
          <li>- Ученики</li>
          <li>- Учителя</li>
          <li>- Классы</li>
        </ul>
        <p>Набор полей объекта Ученик:</p>
        <ul>
          <li>- Фамилия</li>
          <li>- Имя</li>
          <li>- Отчество</li>
          <li>- Год рождения</li>
          <li>- Гендерная принадлежность</li>
        </ul>
        <p>Набор полей объекта Учитель:</p>
        <ul>
          <li>- Фамилия</li>
          <li>- Имя</li>
          <li>- Отчество</li>
          <li>- Год рождения</li>
          <li>- Гендерная принадлежность</li>
          <li>- Основной предмет</li>
        </ul>
        <p>Набор полей объекта Класс:</p>
        <ul>
          <li>- Год обучения</li>
          <li>- Мнемокод</li>
          <li>- Классный руководитель (ссылка на учителя)</li>
          <li>- Список учеников класса (ссылки на учеников)</li>
        </ul>
        <p>
          WEB интерфейс дожен позволять просматривать информацию об объектах
          учета в лайф гриде. Должна иметься возможность сортировок и отбора по
          любым из полей. Возможные действия над объектами учета - Добавление,
          размножение, удаление. Приложение должно работать в сервере приложений
          Tomcat, использовать в качестве СУБД PostgreSQL. Приветствуется
          использование методологии разработки Spring, OS Linux.
        </p>
      </div>
    </div>
  );
};

export default Greetings;
