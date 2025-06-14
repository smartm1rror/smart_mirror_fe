import { personalColorPalettes } from "./PersonalColor";
import PersonalColorDisplay from "./personal-sidecar/PersonalSide";

export default function PersonalColorPage() {
    const bright = personalColorPalettes.find(
        (palette) => palette.key === "autumn_soft"
    );

    if (!bright) return null;

    return (
        <div>
            <div
                className="text-4xl font-bold text-center mb-4"
                style={{
                    marginTop: "30px",
                }}
            >퍼스널 컬러
            </div>

            <PersonalColorDisplay
                colors={bright.colors}
                title={bright.name}
                description={bright.description}
            />
        </div>
    );
}
