class BReader
{
	constructor()
	{
		this.bmax = Math.pow(2, 8);
		this.smax = Math.pow(2, 16);
		this.imax = Math.pow(2, 32);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadUInit32(bytearray, index)
	{
		return ((bytearray[index + 3] << 24) | (bytearray[index + 2] << 16) | (bytearray[index + 1] << 8) | bytearray[index + 0]);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadInit32(bytearray, index)
	{
		var value = ((bytearray[index + 3] << 24) | (bytearray[index + 2] << 16) | (bytearray[index + 1] << 8) | bytearray[index + 0]);
		if (value >= this.imax / 2)
		{
			value = value - this.imax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadUShort(bytearray, index)
	{
		return ((bytearray[index + 1] << 8) | bytearray[index + 0]);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadShort(bytearray, index)
	{
		var value = ((bytearray[index + 1] << 8) | bytearray[index + 0]);
		if (value >= this.smax / 2)
		{
			value = value - this.smax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadShortArray(dest_data, dest_index, src_data, src_index, length)
	{
		for (var i = 0; i < length; i++)
		{
			dest_data[i + dest_index] = this.ReadShort(src_data, src_index); src_index += 2;
		}
		return src_index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadUByte(bytearray, index)
	{
		var value = bytearray[index] & 0xff;
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ReadByte(bytearray, index)
	{
		var value = bytearray[index] & 0xff;
		if (value >= this.bmax/2)
		{
			value = value - this.bmax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ArrayCopy(des_data, des_index, src_data, src_index, length)
	{
		for (var i = 0; i < length; i++)
		{
			des_data[des_index++] = src_data[src_index++];
		}
	}
}
module.exports = new BReader();