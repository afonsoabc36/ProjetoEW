export const prettierRole = (role) => {
    if (role === "admin") return "Administrador";
    else if (role === "teacher") return "Docente";
    else if (role === "student") return "Estudante";
    else return role;
}

const prettierService = {
    prettierRole,
};

export default prettierService;