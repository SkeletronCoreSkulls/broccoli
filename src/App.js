import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import background from "./styles/bg.png";
import video from "./img/video.mp4";
import styled from "styled-components";
import Accordion from './Accordion';
import styles from "./App.css"

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  letter-spacing: 3px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 20px;
  border: none;
  background-color: #e37c22;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  width: 350px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  letter-spacing: 2px;
  font-family: 'Press Start 2P', cursive;
  border-radius: 15px;
  border: none;
  background-color: #e37c22;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  padding: 20px;
  width: 300px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


export const StyledRoundButton = styled.button`
  padding: 10px;
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton2 = styled.button`
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 100px;
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const StyledImg = styled.img`
width: 600px;
  transition: width 0.5s;
`;

export const StyledGrid = styled.img`
width: 500px;
  transition: width 0.5s;
`;

export const StyledImg2 = styled.img`
  border-radius: 20px;
  @media (min-width: 1000px) {
    width: 400px;
  }
  transition: width 0.5s;
`;

export const StyledImg3 = styled.img`
  width: 100%;
  transition: transform 1s;
  :hover {
    transform: translateZ(10px);
  }
`;

export const StyledImg4 = styled.img`
  width: 225px;
  height: 225px;

`;

export const StyledImg5 = styled.img`
  width: 450px;
  height: 400px;

`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;




function App() {
  const accordionData = [
    {
      title: 'What is BNB Chain?',
      content: `BNB Chain is a blockchain created by Binance, the world's largest cryptocurrency exchange by trading volume. The blockchain is fueled by BNB, formerly known as Binance coin. It's a decentralized, open-source ecosystem that helps users create, store, and exchange data.`
    },
    {
      title: 'How to bridge from Solana?',
      content: `You can bridge $BNB from Solana using deBridge. You just have to select from Solana Network and SOL/USDC token and on the route to BNB Chain or Binance Smart Chain, selecting $BNB since it will be the token that we use on the Network`
    },
    {
      title: 'How to mint?',
      content: `Once you connected to the BNB Chain correctly, and you have your $BNB readu, 
      you can go to our mint section above and select how many Broccoli NFTs you want to mint!`
    },
    {
      title: 'How much supply and mint cost?',
      content: `There will be 714 Broccoli NFTs with a total mint cost of 0.1 $BNB`
    },
    {
      title: "I've already minted... now what?",
      content: `Welcome to the Broccoli community! now you are part of the NFT world of the Broccoli NFTs on the BNB! Stay tuned for new updates about the future of the project (...staking to earn $BROCCOLI!)`
},
  ];
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const mintRef = useRef(null);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [isActive, setIsActive] = useState(false);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Select the quantity of Broccoli NFTs you wish to mint`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = 33000000000000000000;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let totalCostWeiNum = cost * mintAmount
    let trueCost = BigInt(totalCostWeiNum).toString();
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: trueCost,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Error. Try again.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congratulations! You minted ${mintAmount} ${CONFIG.NFT_NAME}!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const handleAbout = () => {
    aboutRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleFaq = () => {
    faqRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleMint = () => {
    mintRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleTwitter = () => {
    window.open(
      'https://twitter.com/Broccoli714NFT',
      '_blank'
    );
  };

  const handleTg = () => {
    window.open(
      '',
      '_blank'
    );
  };

const handleOpensea = () => {
    window.open(
      '',
      '_blank'
    );
  };



  return (
    <s.Screen>
     
      <div className="main" style={{display:"flex", 
      backgroundImage: `url(${background})`,
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      flex: "1",
      ai: "1"
       }}>

<s.Container
        ai={"center"}>

        <div className="nav" style={{display:"flex"}}>
        <StyledImg
        src={"/config/images/splogo.png"}
        style={{
        
          marginLeft: "20px",
          marginTop: "20px",
        }}></StyledImg>
          
          <div className="bar" style={{display:"flex", marginTop:"50px", marginLeft: "600px"}}>
          <div className="option1" onClick={handleAbout}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              About
       </s.TextNav>
          </div>

          <div className="option2" style={{marginLeft:"0px"}}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              Mint
       </s.TextNav>
          </div>

          <div className="option3" style={{marginLeft:"0px"}} onClick={handleFaq}>
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                padding: 50,
                letterSpacing: 2,
                color: "var(--accent-text)",
                marginTop: "-10px",
                cursor: "pointer"
              }}
            >
              FAQ
       </s.TextNav>
          </div>
          </div>  
       </div>
   

       <s.SpacerLargeX />
 

       <s.TextTitle 
       style={{
          fontSize: 30,
          letterSpacing: 5,
          marginLeft: "60px",
       }}>
          Join the <b>Broccoli</b> revolution on BNB!
        </s.TextTitle>

        <s.TextTitle 
       style={{
          fontSize: 25,
          fontStyle: "italic",
          letterSpacing: 10,
          marginLeft: "60px",
       }}>
       
        </s.TextTitle>

        <s.SpacerLargeX/>
        <s.SpacerMedium/>

       <div className="grid2" style={{display:"flex", marginLeft: "60px",}}>
        <StyledImg4
        src={"/config/images/punks1.png"}
        >
        </StyledImg4>
        <s.SpacerLargeX/>
        <StyledImg5
        src={"/config/images/image11.png"}
        >
        </StyledImg5>
        <s.SpacerLargeX/>
        <StyledImg4
        src={"/config/images/punks2.png"}
        >
        </StyledImg4>
        </div>


        <s.SpacerLargeX />
        <s.SpacerMedium />

        <StyledButton onClick={handleMint}
        style={{
              boxShadow: "2px 5px 5px 4px rgba(0,0,0,0.5)",
              width: "320px",
              padding: 20,
              marginLeft: "60px",
            }}
            >
            MINT NOW
        </StyledButton>
      
        <s.SpacerLargeXX /> 

        
      <div class="mint">
      <div class="sliderMenu" >
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/12.png"}
          />
          </div>
    

      </div>
      </div>
      </div>
      </div>

 
      <s.SpacerLargeXX />

      <div className="about" ref={aboutRef}> 
      <s.SpacerLargeX />
      
      <s.TextTitle 
      style={{
        textAlign: "center",
        marginLeft: "60px"
      }}
      >
        Who is Broccoli?
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.TextSubTitle
      style={{
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "var(--accent-text)",
        marginTop: 20,
        marginLeft: 150,
        marginRight: 100
      }}
    >
      Broccoli is the Belgian Malinois dog of CZ (Changpeng Zhao), ex CEO of Binance. About a year and a half ago, CZ had no plans to get a dog until a friend from a Dubai zoo surprised him with a Belgian Malinois. The pup arrived with his own passport at CZ's doorstep. Named Broccoli for its green hue and a playful nod to 'blockchain,' the dog's age was uncertain—passport claimed three months, but a vet suggested eleven. Despite this, Broccoli quickly bonded with CZ. Like CZ, Broccoli was not well-socialized; he shied away from other dogs and was scared of everyday objects, running from thrown balls rather than chasing them. Toilet training was another challenge, leading to messes around the house. With endless energy, CZ bought a $200 bike from Amazon to keep up with Broccoli’s stamina, managing 15km jogs. These rides were a respite from CZ's intense DOJ negotiations. Even after nearly a year apart, Broccoli remembered CZ, now matured into a strong, confident dog.
   </s.TextSubTitle>

      

        


    
      <s.SpacerLargeX />
      <s.SpacerLarge />

      <div class="grid" style={{display:"flex", marginLeft: "60px"}}>
  <StyledGrid
        src={"/config/images/grid1.png"}
        style={{
        }}
        
        />
      <s.SpacerLargeXX />

        <StyledGrid
        src={"/config/images/gridcenter.png"}
        style={{
        }}
        
        /><s.SpacerLargeXX />
        <StyledGrid
        src={"/config/images/grid2.png"}
        style={{
        }}
        
        />
    </div>
</div>

      
<s.SpacerLargeXX />
<div ref={mintRef}>
<s.SpacerLargeX />



<ResponsiveWrapper flex={1} style={{ }} mint>
        
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 24,
          }}
        >
           
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ marginTop: "-50px" }}>
          <s.TextSubTitle2
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: 1000,
              letterSpacing: 12,
              color: "var(--secondary-text)",
              marginLeft: "60px",
            }}
          >
            Mint Live
          </s.TextSubTitle2>
          <s.SpacerLargeX />

          <StyledImg2 
            src={"/config/images/gif.gif"} 

            style={{
              marginLeft: "60px"
            }}
          />

          </s.Container>
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "var(--accent-text)",
              marginLeft: "60px"
            }}
          >
       
          </s.TextTitle>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
              marginLeft: "60px"
            }}
          >
         <s.SpacerLargeX />
         
          </s.TextDescription>
          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
             <s.SpacerXSmall />
              <s.TextTitle
                style={{ textAlign: "center", color: "var(--accent-text)", marginLeft: "60px" }}
              >
                The sale has ended.
              </s.TextTitle>
              
            </>
          ) : (
            <>
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 25, marginLeft: "60px" }}
              >
                
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </s.TextTitle2>
              <s.SpacerLargeX />
              <s.TextTitle2
                style={{ textAlign: "center", color: "var(--accent-text)", fontSize: 28, marginLeft: "60px" }}
              >
                Mint price is 0.1 <b>$BNB</b>
              </s.TextTitle2>
              <s.SpacerLargeX />
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  
                  <StyledButton2
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                    style={{ marginLeft: "60px", }}
                  >
                    CONNECT
                  </StyledButton2>
                  

                  {blockchain.errorMsg !== "" ? (
                    <>
                  <s.SpacerLargeX />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          letterSpacing: 2
                        }}
                      >
                        
                      Connection to BNB Mainnet is not working correctly.
                      </s.TextDescription>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          letterSpacing: 2
                        }}
                      >
                        
                        Please wait and try again.
                      </s.TextDescription>
                      
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledRoundButton2
                      style={{ lineHeight: 0.4, color: "var(--primary)"}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}
                    >
                      -
                    </StyledRoundButton2>
                    <s.SpacerMedium />
                    
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)"
                      }}
                    >
                      {mintAmount}
                    </s.TextDescription>
                    
                    <s.SpacerMedium />
                    <StyledRoundButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}
                      style={{
                        color: "var(--primary)"
                      }}
                    >
                      +
                    </StyledRoundButton2>
                  </s.Container>
                  
                  <s.SpacerSmall />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton2
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                    >
                      {claimingNft ? "WAIT" : "MINT"}
                    </StyledButton2>
                    
                  </s.Container>
                </>
              )}
            </>
          )}
        </s.Container>
      </ResponsiveWrapper>

      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />



      <div className="mint">
      <div class="mint">
      <div class="sliderMenu" >
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/1.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/2.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/3.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/4.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/5.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/6.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/7.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/8.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/9.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/10.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/11.png"}
          />
          </div>
          <div class="slide">
          <StyledImg3
            src={"/config/bmb/12.png"}
          />
          </div>
    

      </div>
      </div>
      </div>
      </div>

      <s.SpacerLargeXX />
      <s.SpacerLargeX />
      
      <div className="faq">
      <s.TextTitle
      style={{
        textAlign: "center",
        fontSize: 40,
        fontWeight: 1000,
        letterSpacing: 25,
        marginLeft: "60px",
      }}
    >
        FAQ
      </s.TextTitle>

      <s.SpacerLargeX />
      <s.SpacerSmall />

      <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          style={{
            borderRadius: 30,

          }}
          
        >
          

      <div class="accordion" ref={faqRef}>

        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}

    </div>

    <s.SpacerLargeXX />

    <div className="networks" style={{display:"flex", cursor: "pointer"}} >
    <div className="network1" onClick={handleTwitter}>
    <StyledLogo
    src={"/config/images/tw.png"}
    style={{
      marginLeft: "30px",
      width: "100px"
    }}
    />
    </div>

    </div>

    <s.SpacerLargeXX />

    <s.TextTitle
                style={{ marginLeft: "0px", textAlign: "center", fontSize:"20px", color: "var(--accent-text)" }}
              >
                Broccoli NFTs on BNB Chain
              </s.TextTitle>

              <s.SpacerLargeX />
    </s.Container>
    </div>

</div>

<s.SpacerLarge />



</s.Container>
      </div>
    </s.Screen>
  );
}

export default App;
