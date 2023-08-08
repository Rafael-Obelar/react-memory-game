import * as C from './App.styles';
import Logo from './assets/devmemory_logo.png';
import IconRestart from './svgs/restart.svg';
import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';
import { GridType } from './types/GridType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTime } from './utils/formatTime';

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [move, setMove] = useState(0);
  const [showCount, setShowCount] = useState(0);
  const [gridItems, setGridItems] = useState<GridType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);


  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, time])

  const resetAndCreateGrid = () => {
    // RESETAR O GAME
    setTime(0);
    setMove(0);
    setShowCount(0);

    let grid: GridType[] = [];
    // CRIAR NOVO GRID
    for(let i = 0 ; i < (items.length * 2); i++) {
      grid.push({
        item: null,
        show: false,
        permantent: false
      });
    }

    // ADICIONAR OS ITENS AO GRID
    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < items.length; j++) {
        let pos = -1;
        while (pos < 0 || grid[pos].item !== null) {
          pos = Math.floor(Math.random() * grid.length);
        }
        grid[pos].item = j;
      }
    }

    setGridItems(grid);

    setPlaying(true);
  }



  useEffect(() => {
    if(showCount === 2) {
      let opened = gridItems.filter(item => item.show === true);
      if(opened.length === 2) {

        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if(tmpGrid[i].show) {
              tmpGrid[i].show = false;
              tmpGrid[i].permantent = true;
            }
          setGridItems(tmpGrid);
          setShowCount(0);
          }
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            tmpGrid[i].show = false;
          }
          setGridItems(tmpGrid);
          setShowCount(0);
          }, 500);
        }
        setMove((prevMove) => prevMove + 1);
      }
    }
  }, [showCount, GridItem])

  const handleClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      const grid = [...gridItems];
      const item = grid[index];

      if (grid[index].permantent === false && grid[index].show === false) {
        grid[index].show = true;
        setShowCount(showCount + 1);
      }

      setGridItems(grid);
    }
  }

  useEffect(() => {
    if(move > 0 && gridItems.every(item => item.permantent === true)) {
      setPlaying(false);
    }
  }, [move, gridItems])

  return (
     <C.Container>
      <C.Info>
        <C.LogoLink href=""> 
          <img src={Logo} alt='' width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTime(time)} />
          <InfoItem label="Movimentos" value={move.toString()} />
        </C.InfoArea>

        <Button label="Reiniciar" icon={IconRestart} onClick={resetAndCreateGrid}/>
      </C.Info>

      <C.GridArea>,
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem key={index} item={item} onClick={() => handleClick(index)} />
          ))}
        </C.Grid>
      </C.GridArea>

     </C.Container>
  );
}

export default App