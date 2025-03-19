import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";

const ButtonLogout = () => {
    const { handleLogout } = useLogout();

    return (
        <Button onClick={handleLogout} variant="outline">
            Cerrar Sesión
        </Button>
    );
}

export default ButtonLogout;
