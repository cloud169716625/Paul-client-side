export const getNotificationType = ({ type }) => {
  switch (type) {
    case 0:
      return 'New User Registered';
    case 1:
      return 'New Ticket Created';
    case 2:
      return 'Ticket Updated';
    case 3:
      return 'New Order Created';
    case 4:
      return 'Order Updated';
    case 5:
      return 'New Comment Added on Ticket';
    case 6:
      return 'New Reply Added on Ticket Comment';
    case 7:
      return 'Category Generated';
    case 8:
      return 'Bills';
    default:
      return '';
  }
};

export const getNotificationIcon = () => {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8ZyBpZD0ibm90aWZpY2F0aW9uLWJpbmciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDggLTE4OCkiPgogICAgPHBhdGggaWQ9IlZlY3RvciIgZD0iTTAsMFYzLjMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMTk0LjQ0KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzY5OWZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgICA8cGF0aCBpZD0iVmVjdG9yLTIiIGRhdGEtbmFtZT0iVmVjdG9yIiBkPSJNOC45MTcsMGE2LjY1OCw2LjY1OCwwLDAsMC02LjY2LDYuNjZ2Mi4xYTUuMTkyLDUuMTkyLDAsMCwxLS42MywyLjI4TC4zNTcsMTMuMTZhMi4xMzIsMi4xMzIsMCwwLDAsMS4yLDMuMjUsMjMuMzQsMjMuMzQsMCwwLDAsMTQuNzMsMCwyLjIyLDIuMjIsMCwwLDAsMS4yLTMuMjVsLTEuMjctMi4xMmE1LjIzLDUuMjMsMCwwLDEtLjYzLTIuMjhWNi42NkE2LjcsNi43LDAsMCwwLDguOTE3LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTEuMTAzIDE5MCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM2OTlmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggaWQ9IlZlY3Rvci0zIiBkYXRhLW5hbWU9IlZlY3RvciIgZD0iTTYuNjYsMEEzLjM0MiwzLjM0MiwwLDAsMSwzLjMzLDMuMzMsMy4zMzYsMy4zMzYsMCwwLDEsLjk4LDIuMzUsMy4zMzYsMy4zMzYsMCwwLDEsMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTYuNjcgMjA2LjgyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzY5OWZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogICAgPHBhdGggaWQ9IlZlY3Rvci00IiBkYXRhLW5hbWU9IlZlY3RvciIgZD0iTTAsMEgyNFYyNEgwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA4IDE4OCkiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAiLz4KICA8L2c+Cjwvc3ZnPgo=';
};

export const getNotificationTarget = ({ target }) => {
  switch (target) {
    case 0:
      return 'Clients';
    case 1:
      return 'Admins';
    default:
      return '';
  }
};
