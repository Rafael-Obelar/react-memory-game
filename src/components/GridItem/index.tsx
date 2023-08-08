import * as C from './styles';
import b7 from '../../svgs/b7.svg';
import { GridType } from '../../types/GridType';
import { items } from '../../data/items';


type Props = {
    item: GridType;
    onClick: () => void;
}

export const GridItem = ({item, onClick} : Props) => {
    return (
        <C.Container showBackground={(item.permantent || item.show )} onClick={onClick}>
            {item.permantent === false && item.show === false &&
                <C.Icon src={b7} alt="" opacity={0.3}/>
            }
            { (item.permantent || item.show ) && item.item !== null && 
                <C.Icon src={items[item.item].icon} alt="" />
            }

        </C.Container>
    )
}