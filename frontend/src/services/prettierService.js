export const prettierRole = (role) => {
    if (role === "admin") return "Administrador";
    else if (role === "teacher") return "Docente";
    else if (role === "student") return "Estudante";
    else return role;
}

export const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

const prettierService = {
    prettierRole,
    capitalizeFirstLetter
};

export default prettierService;