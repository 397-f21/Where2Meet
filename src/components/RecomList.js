import React from 'react';

export default function RecomList({ recoms, recenter }) {
    return (
        <>
            {recoms && recoms.length
                ? <div data-testid='recoms-list' className="row justify-content-md-center">
                    {recoms.map((recom, ind) => (
                        <div
                            className="card m-1 p-1 col-md-5 col-sm-12 bg-info"
                            data-testid={`recom_${ind}`}
                            onClick={() => { recenter(recom.lat(), recom.lng()) }}
                            key={ind}>
                            {recom.name}
                        </div>
                    ))}
                </div>
                : null}
        </>
    )
}