document.addEventListener('DOMContentLoaded', () => {
  const p1 = new Pagination({
    id: 'pagination1',
    total: 100,
    pageSize: 10,
    defaultCurrent: 1,
  });
  const p2 = new Pagination({
    id: 'pagination2',
    total: 100,
    pageSize: 10,
    defaultCurrent: 2,
  });
  const p3 = new Pagination({
    id: 'pagination3',
    total: 100,
    pageSize: 10,
    defaultCurrent: 3,
  });
  const p4 = new Pagination({
    id: 'pagination4',
    total: 100,
    pageSize: 10,
    defaultCurrent: 4,
  });
  const p5 = new Pagination({
    id: 'pagination5',
    total: 100,
    pageSize: 10,
    defaultCurrent: 5,
  });
  const p6 = new Pagination({
    id: 'pagination6',
    total: 100,
    pageSize: 10,
    defaultCurrent: 6,
  });
  const p7 = new Pagination({
    id: 'pagination7',
    total: 100,
    pageSize: 10,
    defaultCurrent: 7,
  });
  const p8 = new Pagination({
    id: 'pagination8',
    total: 100,
    pageSize: 10,
    defaultCurrent: 8,
  });
  const p9 = new Pagination({
    id: 'pagination9',
    total: 100,
    pageSize: 10,
    defaultCurrent: 9,
  });
  const p10 = new Pagination({
    id: 'pagination10',
    total: 100,
    pageSize: 10,
    defaultCurrent: 10,
  });

  const p11 = new Pagination({
    id: 'pagination11',
    total: 100,
    pageSize: 10,
    onChange: (p) => {
      p12.goto(p);
    }
  });
  const p12 = new Pagination({
    id: 'pagination12',
    total: 100,
    pageSize: 10,
  });

  const btn1 = new Button({
    id: 'btn1',
    onClick: () => {
      p11.prev();
    }
  });
  const btn2 = new Button({
    id: 'btn2',
    onClick: () => {
      p11.next();
    }
  });
  const btn3 = new Button({
    id: 'btn3',
    onClick: () => {
      p11.goto(5);
    }
  });
  const btn4 = new Button({
    id: 'btn4',
    onClick: () => {
      p11.setPageSize(20);
    }
  });
  const btn5 = new Button({
    id: 'btn5',
    onClick: () => {
      p11.setPageSize(10);
    }
  });
  const btn6 = new Button({
    id: 'btn6',
    onClick: () => {
      p11.setTotal(200);
    }
  });
  const btn7 = new Button({
    id: 'btn7',
    onClick: () => {
      p11.setTotal(100);
    }
  });
});
