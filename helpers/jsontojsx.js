
export default function jsonToJSX(block) {
  return block?.map((block) => {
    switch (block.type) {
      case "header":
        if (block.data.level === 1) {
          return (
            <h1 className="mb-[6px] font-bold">
              {block.data.text}
            </h1>
          );
        } else if (block.data.level === 2) {
          return (
            <h2 className="mb-[6px] font-bold ">
              {block.data.text}
            </h2>
          );
        } else if (block.data.level === 3) {
          return (
            <h3 component='h3' className="mb-[6px] font-bold">
              {block.data.text}
            </h3>
          );
        } else if (block.data.level === 4) {
          return (
            <h4 component='h4' className="mb-[6px] font-bold">
              {block.data.text}
            </h4>
          );
        } else if (block.data.level === 5) {
          return (
            <h5 component='h5' className="mb-[6px] font-bold">
              {block.data.text}
            </h5>
          );
        } else if (block.data.level === 6) {
          return (
            <h6 className="mb-[6px] font-bold">
              {block.data.text}
            </h6>
          );
        } else {
          return (
            <p className="mb-[6px] font-bold">
              {block.data.text}
            </p>
          );
        }

      case "image":
        return (
          <div className="py-[12px]">
            <img
              src={block.data.file.url}
              style={{ width: "100%", borderRadius: 5 }}
              alt={block.data.file.url}
            />
            <p className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: `| ${block.data.caption}` }}
              sx={{ pt: 1 }}
            />
          </div>
        );

      case "table":
        return (
          <table>
            <th>
              {block.data.header.map((header) => (
                <td key={header}>{header}</td>
              ))}
            </th>
            <tbody>
              {block.data.rows.map((row) => (
                <tr key={row}>
                  {row.map((cell) => (
                    <td>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "paragraph":
        return (
          <p className="font-[20px] font-[medium] tracking-normal"
            dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
          />
        );

      case "delimiter":
        return (
          <div className="py-2"
            style={{
              lineHeight: "1.6rem",
              width: "100%",
              textAlign: "center",
              "&::before": {
                content: '"*****"',
                display: "inline-block",
                width: "100%",
                height: "1.6rem",
                lineHeight: "1.6rem",
                fontSize: "2.6rem",
                fontWeight: "bold",
                letterSpacing: "0.2rem",
              },
            }}
          />
        );
      case "qoute":
        return (
          <div className="p-2 my-2 bg-[#E5FFEA]">
            <div className="flex flex-row items-center gap-2">
              <p className="text-6xl">“</p>
              <p className="text-xl font-bold italic text-gray-600"
                dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
              />
              <p className="text-6xl">“</p>
            </div>
            <p className="text-gray-600 text-right pt-1"
              variant='body1'
              dangerouslySetInnerHTML={{ __html: `${block.data.caption}` }}
            />
          </div>
        );

      case "embed":
        return (
          <div className="relative w-[100%] overflow-hidden pt-[56.2%]"
          >
            <iframe
              title='youtube'
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                width: "100%",
                height: "100%",
                border: "none",
              }}
              frameBorder='0'
              src={block.data.embed}
              allow='autoplay; encrypted-media'
            />
          </div>
        );

      case "list":
        let count = 1;
        return (
          <div>
            <ul>
              {block.data.style === "unordered"
                ? block.data.items.map((item) => {
                  return (
                    <>
                      <li>
                        <div className="flex flex-row gap-1 items-center">
                          <div className="h-[10px] w-[10px] bg-[#000000] rounded-[50%] inline-block"
                          />
                          <p className="text-black mb-[6px] text-[18px] font-normal"
                            variant='body1'
                            dangerouslySetInnerHTML={{ __html: `${item}` }}
                          />
                        </div>
                      </li>
                    </>
                  );
                })
                : block.data.items.map((item) => {
                  return (
                    <li>
                      <div className="flex flex-row gap-2">
                        <p className="font-bold" variant='body1'>
                          {count++}
                        </p>
                        <p
                          variant='body1'
                          color='black'
                          className="mb-[6px] text-[18px] font-normal tracking-normal"
                          dangerouslySetInnerHTML={{ __html: `${item}` }}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        );

      default:
        console.log("Unknown block type", block.type);
    }
    return null;
  });
}