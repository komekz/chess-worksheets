import { Chessboard } from 'react-chessboard';

export default function ChessWorksheet({
  puzzles,
  pageName,
  pageNumber
}) {
  const squareStyles = {};

  const lightSquare = 'rgb(255,255,255)';
  const darkSquare = 'rgb(200, 200, 200)';

  let fileColor = false;

  for (let fileASCII = 97; fileASCII <= 104; fileASCII++) {
    fileColor = !fileColor;

    let rankColor = fileColor;

    for (let rankASCII = 49; rankASCII <= 56; rankASCII++) {
      rankColor = !rankColor;

      squareStyles[
        String.fromCharCode(fileASCII) +
          String.fromCharCode(rankASCII)
      ] = {
        backgroundColor: rankColor
          ? lightSquare
          : darkSquare
      };
    }
  }

  const hollowTriangle = (
    <svg
      style={{
        width: '0.17in',
        height: '0.17in'
      }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="transparent"
        stroke="black"
        strokeWidth="4"
        points="50,5 95,95 5,95"
      />
    </svg>
  );

  const filledTriangle = (
    <svg
      style={{
        width: '0.17in',
        height: '0.17in'
      }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="black"
        stroke="black"
        strokeWidth="4"
        points="50,5 95,95 5,95"
      />
    </svg>
  );

  return (
    <>
      <style>
        {`
          @page {
            size: Letter portrait;
            margin: 0;
          }

          @media print {
            html,
            body,
            #root {
              width: 8.5in;
              height: 11in;
              margin: 0 !important;
              padding: 0 !important;
            }

            html,
            body {
              overflow: hidden;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}
      </style>

      <div
        style={{
          width: '8.5in',
          height: '11in',
          boxSizing: 'border-box',
          padding: '0.42in 0.55in 0.3in',
          backgroundColor: 'white',
          color: 'black',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <header
          style={{
            flexShrink: 0,
            marginBottom: '0.22in',
            paddingBottom: '0.11in',
            borderBottom: '2px solid rgb(107, 114, 128)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '0.31in',
              lineHeight: 1.1,
              fontWeight: 700,
              color: 'black'
            }}
          >
            {pageName}
          </h2>

          <span
            style={{
              fontSize: '0.16in',
              fontStyle: 'italic',
              color: 'black'
            }}
          >
            Name: ______________________
          </span>
        </header>

        {/* Six puzzles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '0.1in',
            rowGap: '0.2in',
            flexShrink: 0
          }}
        >
          {puzzles.map((puzzle, index) => {
            const chessboardOptions = {
              position: puzzle,
              allowDragging: false,
              showNotation: false,
              squareStyles
            };

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent:
                    index % 2 === 0
                      ? 'flex-end'
                      : 'flex-start',
                  paddingLeft: '0.16in',
                  paddingRight: '0.16in',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '2.375in',
                      height: '2.375in',
                      border: '1px solid black',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Chessboard options={chessboardOptions} />
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '0.2in',
                      marginTop: '0.03in',
                      paddingRight: '0.18in',
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                  >
                    {puzzle.split(' ')[1] === 'w'
                      ? hollowTriangle
                      : filledTriangle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer stays at the bottom of the physical page */}
        <footer
          style={{
            marginTop: 'auto',
            paddingTop: '0.12in',
            borderTop: '1px solid rgb(209, 213, 219)',
            textAlign: 'center',
            fontSize: '0.13in',
            color: 'rgb(107, 114, 128)',
            flexShrink: 0
          }}
        >
          {pageNumber}
        </footer>
      </div>
    </>
  );
}