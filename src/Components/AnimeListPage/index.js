
import {Container,
    AnimeListCardContainer,
    AnimeListTitleDiv,
    AnimeListDetailRibbon,
    AnimeListDetailContainer,
    AnimeListImage,
    AnimeListRightContent,
    AnimeListParagraph,
    RightDetailDiv,
    PersonIcon,
    StarIcon,
    AnimeListPoster,
    NavLink,
    PaginateContainer} from "./AnimeListElements"
    
    import {useNavigate} from 'react-router-dom';

    import { useState,useEffect } from 'react';
    import { useParams } from "react-router-dom";
    import ReactPaginate from 'react-paginate';
    import './style.css'

    import axios from 'axios'

const AnimeList = () => {
    const navigate = useNavigate();
    const params = useParams()

    // Anime data Container 
  const [AnimeDetail,setAnimeDetail]=useState({})

  // Loading
  const [isLoading,setIsloading]=useState(true);

  //pageCount
  const [PageCount,setPageCount] = useState(0)



  const ProcessLength = (member) =>{

        const string = String(member)

        if (string.length >= 7) {

            return (string.substring(0,1)+('.')+string.substring(1,2)+('M'))
            
        } else {
            
           if (string.length === 6) {

            return (string.substring(0,3)+('K'))
               
           } else if(string.length === 5){
               
            return (string.substring(0,2)+('K'))

           }else if(string.length === 4 ){

            return (string.substring(0,1)+('.')+string.substring(1,2)+('K'))

           }
                
       }
 }

const handleClick = (event) => {
            
            let Cur = event.selected + 1
            navigate(`/Genre/List/${params.id}/${Cur}`, {replace: true})

     
}



  //Filled featuredAnime array with data from API
  useEffect(()=>{

    const getData = async () =>{

        

        const result = await axios (`https://api.jikan.moe/v3/genre/anime/${params.id}/${params.page}`)

        const pageCount = Math.ceil(parseInt(result.data.item_count) / 100)

        setPageCount(pageCount)
        
        setAnimeDetail(result.data)
        setIsloading(false)
        window.scrollTo(0, 0)


    }

    

    getData()


  },[params.page])






    return isLoading ? <h1>Loading....</h1>:
    <>
        <Container>
            {AnimeDetail.anime.map((content)=>(
                <AnimeListCardContainer>
                    <AnimeListTitleDiv>
                        <AnimeListParagraph Title={true} Size={'16px'}>
                           <NavLink to={`/DetailPage/${content.mal_id}`}>{content.title}</NavLink> 
                        </AnimeListParagraph>
                    </AnimeListTitleDiv>

                    <AnimeListDetailRibbon>
                        <AnimeListParagraph Title={false} Size={'12px'}>
                            {content.episodes} episodes
                        </AnimeListParagraph>
                    </AnimeListDetailRibbon>

                    <AnimeListDetailRibbon>
                    {content.genres.map((arr)=>(
                        <AnimeListParagraph Title={false} Size={'11px'} Genre={true}>
                            {arr.name}
                        </AnimeListParagraph>
                    ))}
                    </AnimeListDetailRibbon>

                    <AnimeListDetailContainer>
                        <AnimeListImage>
                            <NavLink to={`/DetailPage/${content.mal_id}`}>
                                <AnimeListPoster src={content.image_url}/>  
                            </NavLink>     
                        </AnimeListImage>
    
                        <AnimeListRightContent>
    
                            <AnimeListParagraph Title={false} Size={'11px'} MarginBottom={'true'}>
                                {content.synopsis}
                            </AnimeListParagraph>

                        {content.producers.length === 0?
                        <></>:
                        <RightDetailDiv>
                            <AnimeListParagraph Title={true} Size={'12px'} >
                                Studios :&nbsp;
                            </AnimeListParagraph>
                            
                              {content.producers.map((studio,index,arr)=>(
                                <AnimeListParagraph Title={false} Size={'12px'} >
                                {arr.length - 1 === index?
                                    <>{studio.name}</>
                                    :
                                    <>{studio.name},&nbsp;</>}
                                </AnimeListParagraph>
                                ))}
                        </RightDetailDiv>
                        }
                        
                        
                        <RightDetailDiv>
                            <AnimeListParagraph Title={true} Size={'12px'} >
                                Source :&nbsp;
                            </AnimeListParagraph>
                            <AnimeListParagraph Title={false} Size={'12px'} >
                                {content.source}
                            </AnimeListParagraph>
                        </RightDetailDiv>

                        {content.themes.length === 0?
                        <></>:
                        <RightDetailDiv>
                            <AnimeListParagraph Title={true} Size={'12px'} >
                                Themes :&nbsp;
                            </AnimeListParagraph>
                            
                              {content.themes.map((theme,index,arr)=>(
                                <AnimeListParagraph Title={false} Size={'12px'} >
                                {arr.length - 1 === index?
                                    <>{theme.name}</>
                                    :
                                    <>{theme.name},&nbsp;</>}
                                </AnimeListParagraph>
                                ))}
                        </RightDetailDiv>
                        }

                        {content.demographics.length === 0?
                        <></>:
                        <RightDetailDiv>
                            <AnimeListParagraph Title={true} Size={'12px'} >
                            Demographics :&nbsp;
                            </AnimeListParagraph>
                            
                              {content.demographics.map((demo,index,arr)=>(
                                <AnimeListParagraph Title={false} Size={'12px'} >
                                {arr.length - 1 === index?
                                    <>{demo.name}</>
                                    :
                                    <>{demo.name},&nbsp;</>}
                                </AnimeListParagraph>
                                ))}
                        </RightDetailDiv>
                        }
                     

    </AnimeListRightContent>
</AnimeListDetailContainer>

<AnimeListDetailRibbon >
    <StarIcon/> 
    <AnimeListParagraph Title={true} Size={'12px'}>
        
       {content.score} 
    
    </AnimeListParagraph>
    <PersonIcon MarginLeft={true}/>
    <AnimeListParagraph Title={true} Size={'12px'}>
        {
        
        ProcessLength(content.members)
        
        }
    </AnimeListParagraph>
</AnimeListDetailRibbon>
</AnimeListCardContainer>
                        


            ))}
</Container>
        <PaginateContainer>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={PageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                />
        </PaginateContainer>
        
        </>
        
    
}

export default AnimeList
