import { Icon } from "@expo/vector-icons/build/createIconSet";
import { ReactNode, useState } from "react"
import { Button, Dialog, Modal, Portal } from "react-native-paper"

export const CustomModal = ({triggerText, mode, content, visible, setVisible, icon }: {triggerText: string | any, icon?:string, mode?:"outlined" | "contained", content:ReactNode, visible:boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {


   

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return(
        <>
        <Portal>
            <Dialog
             visible={visible}
             onDismiss={hideModal}
             style={{padding:5, justifyContent:'center', alignItems:'center'}}
             >
            
                {content}
            </Dialog>
        </Portal>

        <Button mode={mode || "contained"} icon={icon} onPress={showModal} style={{marginHorizontal:10}}>{triggerText}</Button>
        </>
    )
}